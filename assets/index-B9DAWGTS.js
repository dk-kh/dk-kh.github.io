import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{n as t,t as n}from"./vendor-BXvJ-yry.js";import{a as r,i,n as a,t as o}from"./react-CXpkUFVm.js";import{_ as s,b as c,n as l,r as ee,t as te}from"./mui-icons-_SB0cFxT.js";import{a as ne,c as re,d as u,f as d,h as f,i as ie,l as p,m,n as ae,o as oe,p as h,r as g,s as _,t as v,u as y}from"./mui-DQUVk_Xn.js";import{n as b,r as x,t as S}from"./i18n-DFxmMqI6.js";import{a as C,c as se,i as w,l as T,n as ce,o as E,r as D,s as O,t as k,u as A}from"./landing-3d-CSG9YDDW.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var j=e(r(),1),M=a(),N=`Ахмадиев Даулет — портфолио`,le=o(),P=i(),F=`Play, sans-serif`,I=c({cssVariables:{colorSchemeSelector:`class`},colorSchemes:{light:{palette:{primary:y,secondary:p}},dark:{palette:{primary:y,secondary:p}}},typography:{fontFamily:F,fontSize:16,body1:{fontSize:`1rem`},body2:{fontSize:`1rem`},button:{fontSize:`1rem`},subtitle2:{fontSize:`1rem`}},components:{MuiButton:{styleOverrides:{root:{fontFamily:F,fontSize:`1rem`}}},MuiAppBar:{styleOverrides:{root:{fontFamily:F}}},MuiTypography:{styleOverrides:{root:{fontFamily:F}}},MuiInputBase:{styleOverrides:{root:{fontFamily:F,fontSize:`1rem`}}},MuiInputLabel:{styleOverrides:{root:{fontFamily:F,fontSize:`1rem`}}},MuiFormControlLabel:{styleOverrides:{label:{fontFamily:F,fontSize:`1rem`}}}}}),L=e=>{let t=(0,le.c)(2),{children:n}=e,r;return t[0]===n?r=t[1]:(r=(0,P.jsx)(d,{theme:I,defaultMode:`system`,noSsr:!0,children:n}),t[0]=n,t[1]=r),r},R=`/assets/common-qOrem1GJ.json`,z=`/assets/common-Dy4ELsuc.json`,B=`/assets/common-oIV18yUZ.json`,ue=[`ru`,`kk`,`en`],V=Object.assign({"./locales/en/common.json":R,"./locales/kk/common.json":z,"./locales/ru/common.json":B});(async()=>{await x.use(n).use(t).use(b).init({backend:{loadPath:(e,t)=>{let[n]=e,[r]=t;return V[`./locales/${n}/${r}.json`]}},fallbackLng:ue[0],ns:[`common`],defaultNS:`common`,fallbackNS:`common`,supportedLngs:ue,load:`languageOnly`,cleanCode:!0,nonExplicitSupportedLngs:!0,interpolation:{defaultVariables:{appName:N},escapeValue:!1}}),document.documentElement.lang=x.resolvedLanguage??x.language,document.documentElement.dir=x.dir()})(),x.on(`languageChanged`,e=>{document.documentElement.lang=e,document.documentElement.dir=x.dir(e)});var de=(e,t)=>{e.changeLanguage(t)},H=8,U=`
#define MAX_COLORS ${H}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer; // in NDC [-1,1]
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

    for (int j = 0; j < 5; j++) {
      if (j >= uIterations - 1) break;
      vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
      q += (rr - q) * 0.15;
    }

    vec3 col = vec3(0.0);
    float a = 1.0;

    if (uColorCount > 0) {
      vec2 s = q;
      vec3 sumCol = vec3(0.0);
      float cover = 0.0;
      for (int i = 0; i < MAX_COLORS; ++i) {
            if (i >= uColorCount) break;
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3); // strong response across 0..1
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0); // allow >1 to amplify displacement
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float m = mix(m0, m1, kMix);
            float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
            sumCol += uColors[i] * w;
            cover = max(cover, w);
      }
      col = clamp(sumCol, 0.0, 1.0);
      a = uTransparent > 0 ? cover : 1.0;
    } else {
        vec2 s = q;
        for (int k = 0; k < 3; ++k) {
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3);
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float m = mix(m0, m1, kMix);
            col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
        }
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
    }

    col *= uIntensity;

    if (uNoise > 0.0001) {
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
      col += (n - 0.5) * uNoise;
      col = clamp(col, 0.0, 1.0);
    }

    vec3 rgb = (uTransparent > 0) ? col * a : col;
    gl_FragColor = vec4(rgb, a);
}
`,W=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;function fe(e){let t=(0,le.c)(38),{className:n,style:r,rotation:i,speed:a,colors:o,transparent:s,autoRotate:c,scale:l,frequency:ee,warpStrength:te,mouseInfluence:ne,parallax:re,noise:u,iterations:d,intensity:f,bandWidth:ie}=e,p=i===void 0?90:i,m=a===void 0?.2:a,ae;t[0]===o?ae=t[1]:(ae=o===void 0?[]:o,t[0]=o,t[1]=ae);let oe=ae,h=s===void 0||s,g=c===void 0?0:c,_=l===void 0?1:l,v=ee===void 0?1:ee,y=te===void 0?1:te,b=ne===void 0?1:ne,x=re===void 0?.5:re,S=u===void 0?.15:u,A=d===void 0?1:d,M=f===void 0?1.5:f,N=ie===void 0?6:ie,F=(0,j.useRef)(null),I=(0,j.useRef)(null),L=(0,j.useRef)(null),R=(0,j.useRef)(null),z=(0,j.useRef)(null),B=(0,j.useRef)(p),ue=(0,j.useRef)(g),V;t[2]===Symbol.for(`react.memo_cache_sentinel`)?(V=new T(0,0),t[2]=V):V=t[2];let de=(0,j.useRef)(V),fe;t[3]===Symbol.for(`react.memo_cache_sentinel`)?(fe=new T(0,0),t[3]=fe):fe=t[3];let me=(0,j.useRef)(fe),he=(0,j.useRef)(8),K;t[4]!==N||t[5]!==v||t[6]!==M||t[7]!==A||t[8]!==b||t[9]!==S||t[10]!==x||t[11]!==_||t[12]!==m||t[13]!==h||t[14]!==y?(K=()=>{let e=F.current,t=new O,n=new w(-1,1,1,-1,0,1),r=new C(2,2),i=Array.from({length:H},G),a=new se({vertexShader:W,fragmentShader:U,uniforms:{uCanvas:{value:new T(1,1)},uTime:{value:0},uSpeed:{value:m},uRot:{value:new T(1,0)},uColorCount:{value:0},uColors:{value:i},uTransparent:{value:+!!h},uScale:{value:_},uFrequency:{value:v},uWarpStrength:{value:y},uPointer:{value:new T(0,0)},uMouseInfluence:{value:b},uParallax:{value:x},uNoise:{value:S},uIterations:{value:A},uIntensity:{value:M},uBandWidth:{value:N}},premultipliedAlpha:!0,transparent:!0});R.current=a;let o=new D(r,a);t.add(o);let s=new k({antialias:!1,powerPreference:`high-performance`,alpha:!0});I.current=s,s.outputColorSpace=E,s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),s.setClearColor(0,+!h),s.domElement.style.width=`100%`,s.domElement.style.height=`100%`,s.domElement.style.display=`block`,e.appendChild(s.domElement);let c=new ce,l=()=>{let t=e.clientWidth||1,n=e.clientHeight||1;s.setSize(t,n,!1),a.uniforms.uCanvas.value.set(t,n)};if(l(),`ResizeObserver`in window){let t=new ResizeObserver(l);t.observe(e),z.current=t}else window.addEventListener(`resize`,l);let ee=()=>{let e=c.getDelta(),r=c.elapsedTime;a.uniforms.uTime.value=r;let i=(B.current%360+ue.current*r)*Math.PI/180,o=Math.cos(i),l=Math.sin(i);a.uniforms.uRot.value.set(o,l);let te=me.current,ne=de.current,re=Math.min(1,e*he.current);te.lerp(ne,re),a.uniforms.uPointer.value.copy(te),s.render(t,n),L.current=requestAnimationFrame(ee)};return L.current=requestAnimationFrame(ee),()=>{L.current!==null&&cancelAnimationFrame(L.current),z.current?z.current.disconnect():window.removeEventListener(`resize`,l),r.dispose(),a.dispose(),s.dispose(),s.forceContextLoss(),s.domElement&&s.domElement.parentElement===e&&e.removeChild(s.domElement)}},t[4]=N,t[5]=v,t[6]=M,t[7]=A,t[8]=b,t[9]=S,t[10]=x,t[11]=_,t[12]=m,t[13]=h,t[14]=y,t[15]=K):K=t[15];let q;t[16]===Symbol.for(`react.memo_cache_sentinel`)?(q=[],t[16]=q):q=t[16],(0,j.useEffect)(K,q);let J,Y;t[17]!==g||t[18]!==N||t[19]!==oe||t[20]!==v||t[21]!==M||t[22]!==A||t[23]!==b||t[24]!==S||t[25]!==x||t[26]!==p||t[27]!==_||t[28]!==m||t[29]!==h||t[30]!==y?(J=()=>{let e=R.current,t=I.current;if(!e)return;B.current=p,ue.current=g,e.uniforms.uSpeed.value=m,e.uniforms.uScale.value=_,e.uniforms.uFrequency.value=v,e.uniforms.uWarpStrength.value=y,e.uniforms.uMouseInfluence.value=b,e.uniforms.uParallax.value=x,e.uniforms.uNoise.value=S,e.uniforms.uIterations.value=A,e.uniforms.uIntensity.value=M,e.uniforms.uBandWidth.value=N;let n=pe,r=(oe||[]).filter(Boolean).slice(0,H).map(n);for(let t=0;t<H;t++){let n=e.uniforms.uColors.value[t];t<r.length?n.copy(r[t]):n.set(0,0,0)}e.uniforms.uColorCount.value=r.length,e.uniforms.uTransparent.value=+!!h,t&&t.setClearColor(0,+!h)},Y=[p,g,m,_,v,y,b,x,S,A,M,N,oe,h],t[17]=g,t[18]=N,t[19]=oe,t[20]=v,t[21]=M,t[22]=A,t[23]=b,t[24]=S,t[25]=x,t[26]=p,t[27]=_,t[28]=m,t[29]=h,t[30]=y,t[31]=J,t[32]=Y):(J=t[31],Y=t[32]),(0,j.useEffect)(J,Y);let X,Z;t[33]===Symbol.for(`react.memo_cache_sentinel`)?(X=()=>{let e=R.current,t=F.current;if(!e||!t)return;let n=e=>{let n=t.getBoundingClientRect(),r=(e.clientX-n.left)/(n.width||1)*2-1,i=-((e.clientY-n.top)/(n.height||1)*2-1);de.current.set(r,i)};return t.addEventListener(`pointermove`,n),()=>{t.removeEventListener(`pointermove`,n)}},Z=[],t[33]=X,t[34]=Z):(X=t[33],Z=t[34]),(0,j.useEffect)(X,Z);let Q=`w-full h-full relative overflow-hidden ${n}`,$;return t[35]!==r||t[36]!==Q?($=(0,P.jsx)(`div`,{ref:F,className:Q,style:r}),t[35]=r,t[36]=Q,t[37]=$):$=t[37],$}function pe(e){let t=e.replace(`#`,``).trim(),n=t.length===3?[parseInt(t[0]+t[0],16),parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16)]:[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)];return new A(n[0]/255,n[1]/255,n[2]/255)}function G(){return new A(0,0,0)}var me=()=>{let e=(0,le.c)(14),t=s(),{mode:n,systemMode:r}=h(),i=(n===`system`?r:n)===`dark`,a=i?`#fff`:`#000`,o=i?`#000`:`#fff`,c;return e[0]!==a||e[1]!==o||e[2]!==t.palette.background.paper||e[3]!==t.palette.divider||e[4]!==t.palette.error.main||e[5]!==t.palette.info.main||e[6]!==t.palette.primary.contrastText||e[7]!==t.palette.primary.light||e[8]!==t.palette.primary.main||e[9]!==t.palette.secondary.main||e[10]!==t.palette.success.main||e[11]!==t.palette.text.primary||e[12]!==t.palette.warning.main?(c={divider:t.palette.divider,paper:t.palette.background.paper,primary:t.palette.primary.main,primaryLight:t.palette.primary.light,secondary:t.palette.secondary.main,text:t.palette.text.primary,contrastText:t.palette.primary.contrastText,foreground:a,background:o,success:t.palette.success.main,warning:t.palette.warning.main,error:t.palette.error.main,info:t.palette.info.main,msg:`#fff`},e[0]=a,e[1]=o,e[2]=t.palette.background.paper,e[3]=t.palette.divider,e[4]=t.palette.error.main,e[5]=t.palette.info.main,e[6]=t.palette.primary.contrastText,e[7]=t.palette.primary.light,e[8]=t.palette.primary.main,e[9]=t.palette.secondary.main,e[10]=t.palette.success.main,e[11]=t.palette.text.primary,e[12]=t.palette.warning.main,e[13]=c):c=e[13],c},he=`tequi1ash0ts`,K=()=>{let e=(0,le.c)(86),{t,i18n:n}=S(),{mode:r,systemMode:i,setMode:a}=h(),o=me(),s=(r===`system`?i:r)===`dark`,c=n.resolvedLanguage??n.language,u;e[0]!==o.primary||e[1]!==o.primaryLight||e[2]!==o.secondary?(u=[o.primary,o.primaryLight,o.secondary],e[0]=o.primary,e[1]=o.primaryLight,e[2]=o.secondary,e[3]=u):u=e[3];let d=u,f;e[4]!==s||e[5]!==a?(f=()=>a(s?`light`:`dark`),e[4]=s,e[5]=a,e[6]=f):f=e[6];let p=f,m;e[7]===d?m=e[8]:(m=(0,P.jsx)(fe,{colors:d,rotation:90,speed:.2,scale:1,frequency:1,warpStrength:1,mouseInfluence:1,noise:.15,parallax:.5,iterations:1,intensity:1.5,bandWidth:6,transparent:!0,autoRotate:0,className:``}),e[7]=d,e[8]=m);let y;e[9]===Symbol.for(`react.memo_cache_sentinel`)?(y={xs:3,sm:5},e[9]=y):y=e[9];let b=s?`rgba(255,255,255,0.12)`:`rgba(0,0,0,0.08)`,x=s?`rgba(10,10,20,0.55)`:`rgba(255,255,255,0.6)`,C;e[10]!==b||e[11]!==x?(C={width:`100%`,maxWidth:560,maxHeight:`100%`,overflowY:`auto`,p:y,borderRadius:6,border:`1px solid`,borderColor:b,bgcolor:x,backdropFilter:`blur(18px)`,color:`text.primary`},e[10]=b,e[11]=x,e[12]=C):C=e[12];let se;e[13]===Symbol.for(`react.memo_cache_sentinel`)?(se={justifyContent:`space-between`,alignItems:`center`},e[13]=se):se=e[13];let w;e[14]===t?w=e[15]:(w=t(`portfolio.badge`),e[14]=t,e[15]=w);let T;e[16]===w?T=e[17]:(T=(0,P.jsx)(oe,{label:w,color:`primary`,size:`small`}),e[16]=w,e[17]=T);let ce;e[18]===Symbol.for(`react.memo_cache_sentinel`)?(ce={alignItems:`center`},e[18]=ce):ce=e[18];let E;e[19]!==c||e[20]!==n||e[21]!==t?(E=ue.map(e=>(0,P.jsx)(ae,{title:t(`portfolio.language`),children:(0,P.jsx)(ie,{size:`small`,onClick:()=>de(n,e),sx:{opacity:c===e?1:.45},children:(0,P.jsx)(`img`,{src:`/images/flags/${e}.svg`,alt:e,width:22,height:16,style:{borderRadius:3,objectFit:`cover`}})})},e)),e[19]=c,e[20]=n,e[21]=t,e[22]=E):E=e[22];let D;e[23]===t?D=e[24]:(D=t(`portfolio.toggleTheme`),e[23]=t,e[24]=D);let O;e[25]===s?O=e[26]:(O=s?(0,P.jsx)(l,{fontSize:`small`}):(0,P.jsx)(ee,{fontSize:`small`}),e[25]=s,e[26]=O);let k;e[27]!==O||e[28]!==p?(k=(0,P.jsx)(ie,{size:`small`,onClick:p,children:O}),e[27]=O,e[28]=p,e[29]=k):k=e[29];let A;e[30]!==D||e[31]!==k?(A=(0,P.jsx)(ae,{title:D,children:k}),e[30]=D,e[31]=k,e[32]=A):A=e[32];let j;e[33]!==E||e[34]!==A?(j=(0,P.jsxs)(g,{direction:`row`,spacing:.5,sx:ce,children:[E,A]}),e[33]=E,e[34]=A,e[35]=j):j=e[35];let M;e[36]!==j||e[37]!==T?(M=(0,P.jsxs)(g,{direction:`row`,sx:se,children:[T,j]}),e[36]=j,e[37]=T,e[38]=M):M=e[38];let N;e[39]===Symbol.for(`react.memo_cache_sentinel`)?(N={mt:4,fontWeight:700,fontSize:{xs:`2rem`,sm:`2.6rem`},lineHeight:1.15},e[39]=N):N=e[39];let F;e[40]===t?F=e[41]:(F=t(`portfolio.name`),e[40]=t,e[41]=F);let I;e[42]===F?I=e[43]:(I=(0,P.jsx)(v,{component:`h1`,sx:N,children:F}),e[42]=F,e[43]=I);let L;e[44]===Symbol.for(`react.memo_cache_sentinel`)?(L={mt:1.5,opacity:.8},e[44]=L):L=e[44];let R;e[45]===t?R=e[46]:(R=t(`portfolio.role`),e[45]=t,e[46]=R);let z;e[47]===t?z=e[48]:(z=t(`portfolio.group`),e[47]=t,e[48]=z);let B;e[49]!==R||e[50]!==z?(B=(0,P.jsxs)(v,{sx:L,children:[R,` · `,z]}),e[49]=R,e[50]=z,e[51]=B):B=e[51];let V;e[52]===Symbol.for(`react.memo_cache_sentinel`)?(V=(0,P.jsx)(ne,{sx:{my:4}}),e[52]=V):V=e[52];let H;e[53]===Symbol.for(`react.memo_cache_sentinel`)?(H={fontWeight:700,fontSize:`1.25rem`,mb:1.5},e[53]=H):H=e[53];let U;e[54]===t?U=e[55]:(U=t(`portfolio.projectsTitle`),e[54]=t,e[55]=U);let W;e[56]===U?W=e[57]:(W=(0,P.jsx)(v,{component:`h2`,sx:H,children:U}),e[56]=U,e[57]=W);let pe;e[58]===Symbol.for(`react.memo_cache_sentinel`)?(pe={p:2.5,borderRadius:3,border:`1px dashed`,borderColor:`divider`,opacity:.75,textAlign:`center`},e[58]=pe):pe=e[58];let G;e[59]===t?G=e[60]:(G=t(`portfolio.projectsSoon`),e[59]=t,e[60]=G);let K;e[61]===G?K=e[62]:(K=(0,P.jsx)(re,{sx:pe,children:(0,P.jsx)(v,{children:G})}),e[61]=G,e[62]=K);let q;e[63]===Symbol.for(`react.memo_cache_sentinel`)?(q={fontWeight:700,fontSize:`1.25rem`,mt:4,mb:1.5},e[63]=q):q=e[63];let J;e[64]===t?J=e[65]:(J=t(`portfolio.contactsTitle`),e[64]=t,e[65]=J);let Y;e[66]===J?Y=e[67]:(Y=(0,P.jsx)(v,{component:`h2`,sx:q,children:J}),e[66]=J,e[67]=Y);let X;e[68]===Symbol.for(`react.memo_cache_sentinel`)?(X=(0,P.jsx)(te,{}),e[68]=X):X=e[68];let Z;e[69]===Symbol.for(`react.memo_cache_sentinel`)?(Z={borderRadius:3,textTransform:`none`},e[69]=Z):Z=e[69];let Q;e[70]===t?Q=e[71]:(Q=t(`portfolio.telegram`),e[70]=t,e[71]=Q);let $;e[72]===Q?$=e[73]:($=(0,P.jsxs)(_,{variant:`contained`,startIcon:X,href:`https://t.me/${he}`,target:`_blank`,rel:`noopener noreferrer`,sx:Z,children:[Q,` · @${he}`]}),e[72]=Q,e[73]=$);let ge;e[74]!==M||e[75]!==I||e[76]!==B||e[77]!==W||e[78]!==K||e[79]!==Y||e[80]!==$||e[81]!==C?(ge=(0,P.jsx)(`div`,{className:`absolute inset-0 flex items-center justify-center p-4 pointer-events-none`,children:(0,P.jsxs)(re,{className:`pointer-events-auto`,sx:C,children:[M,I,B,V,W,K,Y,$]})}),e[74]=M,e[75]=I,e[76]=B,e[77]=W,e[78]=K,e[79]=Y,e[80]=$,e[81]=C,e[82]=ge):ge=e[82];let _e;return e[83]!==m||e[84]!==ge?(_e=(0,P.jsxs)(`main`,{className:`w-screen h-screen absolute`,children:[m,ge]}),e[83]=m,e[84]=ge,e[85]=_e):_e=e[85],_e},q=document.querySelector(`#root`);if(!q)throw Error(`Root element not found`);(0,M.createRoot)(q).render((0,P.jsx)(u,{dateAdapter:m,children:(0,P.jsxs)(L,{children:[(0,P.jsx)(f,{}),(0,P.jsx)(j.Suspense,{children:(0,P.jsx)(K,{})})]})}));