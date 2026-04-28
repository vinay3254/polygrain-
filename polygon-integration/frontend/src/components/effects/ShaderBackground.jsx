import { useEffect, useRef } from 'react';

const VS = `
  attribute vec2 pos;
  void main() { gl_Position = vec4(pos, 0.0, 1.0); }
`;

const FS = `
precision highp float;
uniform float t;
uniform vec2  res;

#define GOLD  vec3(0.831, 0.710, 0.443)
#define SGOLD vec3(0.435, 0.318, 0.082)
#define BLUE  vec3(0.267, 0.533, 1.000)
#define BG    vec3(0.0353, 0.0431, 0.0431)

float segDist(vec2 p, vec2 a, vec2 b) {
  vec2 ab = b-a, ap = p-a;
  return length(ap - ab*clamp(dot(ap,ab)/dot(ab,ab),0.0,1.0));
}

vec3 beam(vec2 uv, vec2 a, vec2 b, float w, vec3 col, float disp, float bright) {
  vec2 perp = vec2(-(b-a).y, (b-a).x) / length(b-a);
  float dR = segDist(uv+perp*disp, a, b);
  float dG = segDist(uv,           a, b);
  float dB = segDist(uv-perp*disp, a, b);
  vec3 ch = vec3(exp(-dR/w)*mix(col.r,1.0,0.3), exp(-dG/w)*mix(col.g,1.0,0.2), exp(-dB/w)*mix(col.b,1.0,0.35));
  float core = exp(-(dG*dG)/(w*w*0.012)) * bright * 2.2;
  return ch * bright + core;
}

vec3 blob(vec2 uv, vec2 cen, float rx, float ry, float ang, vec3 col, float bright) {
  float cs=cos(ang), sn=sin(ang);
  vec2 perp=vec2(-sn,cs);
  float disp=0.025;
  vec2 lR=uv+perp*disp-cen, lG=uv-cen, lB=uv-perp*disp-cen;
  float dR=length(vec2(cs*lR.x+sn*lR.y,-sn*lR.x+cs*lR.y)/vec2(rx,ry));
  float dG=length(vec2(cs*lG.x+sn*lG.y,-sn*lG.x+cs*lG.y)/vec2(rx,ry));
  float dB=length(vec2(cs*lB.x+sn*lB.y,-sn*lB.x+cs*lB.y)/vec2(rx,ry));
  float k=3.6;
  vec3 ch=vec3(exp(-dR*k)*mix(col.r,1.0,0.2), exp(-dG*k)*mix(col.g,1.0,0.15), exp(-dB*k)*mix(col.b,1.0,0.4));
  return ch*bright + exp(-dG*dG*k*k*0.8)*bright*2.4;
}

void main() {
  vec2 uv = gl_FragCoord.xy/res * 2.0 - 1.0;
  uv.x *= res.x/res.y;
  vec3 col = BG;

  float a1=t*0.19+sin(t*0.37)*0.9+sin(t*0.11)*0.4;
  vec2 d1=vec2(cos(a1),sin(a1));
  vec2 o1=vec2(sin(t*0.13)*0.55+cos(t*0.07)*0.2, cos(t*0.17)*0.40+sin(t*0.09)*0.15);
  col += beam(uv,-d1*2.8+o1,d1*2.8+o1,0.072,GOLD,0.032,1.1);

  float a2=-t*0.27+cos(t*0.23)*1.1+2.1;
  vec2 d2=vec2(cos(a2),sin(a2));
  vec2 o2=vec2(cos(t*0.11)*0.45-sin(t*0.19)*0.25, sin(t*0.08)*0.35+cos(t*0.14)*0.18);
  col += beam(uv,-d2*2.8+o2,d2*2.8+o2,0.058,BLUE,0.027,0.95);

  float a3=t*0.09+0.8+sin(t*0.05)*0.6;
  vec2 d3=vec2(cos(a3),sin(a3));
  vec2 o3=vec2(sin(t*0.06)*0.3,cos(t*0.08)*0.2);
  col += beam(uv,-d3*2.2+o3,d3*2.2+o3,0.038,SGOLD,0.019,0.5);

  vec2 p1=vec2(sin(t*0.17)*0.70+cos(t*0.11)*0.30+sin(t*0.07)*0.15, cos(t*0.13)*0.55+sin(t*0.19)*0.22+cos(t*0.05)*0.12);
  col += blob(uv,p1,0.15+sin(t*0.21)*0.06+cos(t*0.13)*0.025,0.09+cos(t*0.27)*0.04,t*0.18+sin(t*0.11)*0.9,GOLD,1.6);

  vec2 p2=vec2(cos(t*0.15)*0.65-sin(t*0.09)*0.42+cos(t*0.21)*0.13, sin(t*0.11)*0.72-cos(t*0.13)*0.28+sin(t*0.07)*0.10);
  col += blob(uv,p2,0.12+cos(t*0.19)*0.05,0.08+sin(t*0.29)*0.035,-t*0.14+cos(t*0.12)*0.8,BLUE,1.3);

  col = col/(col+1.0);
  col = pow(max(col,0.0), vec3(1.0/2.2));
  gl_FragColor = vec4(col, 1.0);
}
`;

function mkShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s));
  return s;
}

export default function ShaderBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false })
            || canvas.getContext('experimental-webgl', { alpha: false });
    if (!gl) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl, gl.VERTEX_SHADER,   VS));
    gl.attachShader(prog, mkShader(gl, gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uT   = gl.getUniformLocation(prog, 't');
    const uRes = gl.getUniformLocation(prog, 'res');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    gl.clearColor(0.0353, 0.0431, 0.0431, 1.0);

    const t0 = performance.now();
    let raf;
    function loop() {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
