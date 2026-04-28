const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { randomUUID } = require('crypto');
const Recording = require('../models/Recording');
const auth = require('../middleware/auth');

const router = express.Router();
const uploadsDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadsDir);
  },
  filename: (_req, file, callback) => {
    callback(null, `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, callback) => {
    const allowedMimeTypes = ['video/webm', 'video/mp4'];

    if (allowedMimeTypes.includes(file.mimetype)) {
      return callback(null, true);
    }

    return callback(new Error('Only video/webm and video/mp4 files are allowed.'));
  },
});

const handleUpload = (req, res, next) => {
  upload.single('file')(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return next();
  });
};

const cleanupUploadedFile = async (filename) => {
  if (!filename) {
    return;
  }

  const filePath = path.join(uploadsDir, filename);

  if (fs.existsSync(filePath)) {
    await fs.promises.unlink(filePath);
  }
};

router.post('/upload', auth, handleUpload, async (req, res, next) => {
  try {
    const { roomCode, duration } = req.body;

    if (!roomCode) {
      await cleanupUploadedFile(req.file?.filename);

      return res.status(400).json({
        success: false,
        message: 'roomCode is required.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Recording file is required.',
      });
    }

    const recording = await Recording.create({
      roomCode: roomCode.trim().toLowerCase(),
      uploadedBy: req.user.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      duration: Number(duration) || 0,
    });

    const populatedRecording = await Recording.findById(recording._id).populate(
      'uploadedBy',
      'name email avatar'
    );

    return res.status(201).json({
      success: true,
      data: {
        recording: populatedRecording,
      },
    });
  } catch (error) {
    await cleanupUploadedFile(req.file?.filename);
    return next(error);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const recordings = await Recording.find({ uploadedBy: req.user.id })
      .populate('uploadedBy', 'name email avatar')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: {
        recordings,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: 'Recording not found.',
      });
    }

    const recording = await Recording.findOne({
      _id: req.params.id,
      uploadedBy: req.user.id,
    }).populate('uploadedBy', 'name email avatar');

    if (!recording) {
      return res.status(404).json({
        success: false,
        message: 'Recording not found.',
      });
    }

    const filePath = path.join(uploadsDir, recording.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Recording file not found.',
      });
    }

    const extension = path.extname(recording.filename).toLowerCase();
    const mimeType = extension === '.mp4' ? 'video/mp4' : 'video/webm';

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Length', recording.size);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${recording.originalName || recording.filename}"`
    );
    res.setHeader('X-Recording-Id', recording.id);
    res.setHeader('X-Room-Code', recording.roomCode);
    res.setHeader('X-Recording-Duration', String(recording.duration || 0));
    res.setHeader(
      'X-Uploaded-By',
      recording.uploadedBy?.name || recording.uploadedBy?._id?.toString() || ''
    );

    return fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: 'Recording not found.',
      });
    }

    const recording = await Recording.findById(req.params.id);

    if (!recording) {
      return res.status(404).json({
        success: false,
        message: 'Recording not found.',
      });
    }

    if (recording.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to delete this recording.',
      });
    }

    await cleanupUploadedFile(recording.filename);
    await recording.deleteOne();

    return res.json({
      success: true,
      data: {
        message: 'Recording deleted successfully.',
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
