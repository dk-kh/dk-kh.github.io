import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{n as t,t as n}from"./vendor-BXvJ-yry.js";import{a as r,i,n as a,t as o}from"./react-CXpkUFVm.js";import{i as s,n as ee,r as c,t as te,v as l,x as u}from"./mui-icons-CHe8OcHT.js";import{a as ne,c as re,d,f as ie,h as f,i as p,l as m,m as h,n as ae,o as g,p as _,r as v,s as y,t as b,u as x}from"./mui-D9vmQNTz.js";import{n as S,r as C,t as w}from"./i18n-DFxmMqI6.js";import{a as T,c as oe,i as se,l as E,n as ce,o as D,r as O,s as k,t as A,u as j}from"./landing-3d-CSG9YDDW.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var M=e(r(),1),N=a(),P=`Ахмадиев Даулет — портфолио`,le=o(),F=i(),I=`Play, sans-serif`,L=u({cssVariables:{colorSchemeSelector:`class`},colorSchemes:{light:{palette:{primary:x,secondary:m}},dark:{palette:{primary:x,secondary:m}}},typography:{fontFamily:I,fontSize:16,body1:{fontSize:`1rem`},body2:{fontSize:`1rem`},button:{fontSize:`1rem`},subtitle2:{fontSize:`1rem`}},components:{MuiButton:{styleOverrides:{root:{fontFamily:I,fontSize:`1rem`}}},MuiAppBar:{styleOverrides:{root:{fontFamily:I}}},MuiTypography:{styleOverrides:{root:{fontFamily:I}}},MuiInputBase:{styleOverrides:{root:{fontFamily:I,fontSize:`1rem`}}},MuiInputLabel:{styleOverrides:{root:{fontFamily:I,fontSize:`1rem`}}},MuiFormControlLabel:{styleOverrides:{label:{fontFamily:I,fontSize:`1rem`}}}}}),R=e=>{let t=(0,le.c)(2),{children:n}=e,r;return t[0]===n?r=t[1]:(r=(0,F.jsx)(ie,{theme:L,defaultMode:`system`,noSsr:!0,children:n}),t[0]=n,t[1]=r),r},z=`/assets/common-10xekYzj.json`,B=`/assets/common-Dww528r_.json`,V=`/assets/common-3HZdqEDu.json`,H=[`ru`,`kk`,`en`],U=Object.assign({"./locales/en/common.json":z,"./locales/kk/common.json":B,"./locales/ru/common.json":V});(async()=>{await C.use(n).use(t).use(S).init({backend:{loadPath:(e,t)=>{let[n]=e,[r]=t;return U[`./locales/${n}/${r}.json`]}},fallbackLng:H[0],ns:[`common`],defaultNS:`common`,fallbackNS:`common`,supportedLngs:H,load:`languageOnly`,cleanCode:!0,nonExplicitSupportedLngs:!0,interpolation:{defaultVariables:{appName:P},escapeValue:!1}}),document.documentElement.lang=C.resolvedLanguage??C.language,document.documentElement.dir=C.dir()})(),C.on(`languageChanged`,e=>{document.documentElement.lang=e,document.documentElement.dir=C.dir(e)});var ue=(e,t)=>{e.changeLanguage(t)},W=8,G=`
#define MAX_COLORS ${W}
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
`,K=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;function de(e){let t=(0,le.c)(38),{className:n,style:r,rotation:i,speed:a,colors:o,transparent:s,autoRotate:ee,scale:c,frequency:te,warpStrength:l,mouseInfluence:u,parallax:ne,noise:re,iterations:d,intensity:ie,bandWidth:f}=e,p=i===void 0?90:i,m=a===void 0?.2:a,h;t[0]===o?h=t[1]:(h=o===void 0?[]:o,t[0]=o,t[1]=h);let ae=h,g=s===void 0||s,_=ee===void 0?0:ee,v=c===void 0?1:c,y=te===void 0?1:te,b=l===void 0?1:l,x=u===void 0?1:u,S=ne===void 0?.5:ne,C=re===void 0?.15:re,w=d===void 0?1:d,j=ie===void 0?1.5:ie,N=f===void 0?6:f,P=(0,M.useRef)(null),I=(0,M.useRef)(null),L=(0,M.useRef)(null),R=(0,M.useRef)(null),z=(0,M.useRef)(null),B=(0,M.useRef)(p),V=(0,M.useRef)(_),H;t[2]===Symbol.for(`react.memo_cache_sentinel`)?(H=new E(0,0),t[2]=H):H=t[2];let U=(0,M.useRef)(H),ue;t[3]===Symbol.for(`react.memo_cache_sentinel`)?(ue=new E(0,0),t[3]=ue):ue=t[3];let de=(0,M.useRef)(ue),fe=(0,M.useRef)(8),pe;t[4]!==N||t[5]!==y||t[6]!==j||t[7]!==w||t[8]!==x||t[9]!==C||t[10]!==S||t[11]!==v||t[12]!==m||t[13]!==g||t[14]!==b?(pe=()=>{let e=P.current,t=new k,n=new se(-1,1,1,-1,0,1),r=new T(2,2),i=Array.from({length:W},J),a=new oe({vertexShader:K,fragmentShader:G,uniforms:{uCanvas:{value:new E(1,1)},uTime:{value:0},uSpeed:{value:m},uRot:{value:new E(1,0)},uColorCount:{value:0},uColors:{value:i},uTransparent:{value:+!!g},uScale:{value:v},uFrequency:{value:y},uWarpStrength:{value:b},uPointer:{value:new E(0,0)},uMouseInfluence:{value:x},uParallax:{value:S},uNoise:{value:C},uIterations:{value:w},uIntensity:{value:j},uBandWidth:{value:N}},premultipliedAlpha:!0,transparent:!0});R.current=a;let o=new O(r,a);t.add(o);let s=new A({antialias:!1,powerPreference:`high-performance`,alpha:!0});I.current=s,s.outputColorSpace=D,s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),s.setClearColor(0,+!g),s.domElement.style.width=`100%`,s.domElement.style.height=`100%`,s.domElement.style.display=`block`,e.appendChild(s.domElement);let ee=new ce,c=()=>{let t=e.clientWidth||1,n=e.clientHeight||1;s.setSize(t,n,!1),a.uniforms.uCanvas.value.set(t,n)};if(c(),`ResizeObserver`in window){let t=new ResizeObserver(c);t.observe(e),z.current=t}else window.addEventListener(`resize`,c);let te=()=>{let e=ee.getDelta(),r=ee.elapsedTime;a.uniforms.uTime.value=r;let i=(B.current%360+V.current*r)*Math.PI/180,o=Math.cos(i),c=Math.sin(i);a.uniforms.uRot.value.set(o,c);let l=de.current,u=U.current,ne=Math.min(1,e*fe.current);l.lerp(u,ne),a.uniforms.uPointer.value.copy(l),s.render(t,n),L.current=requestAnimationFrame(te)};return L.current=requestAnimationFrame(te),()=>{L.current!==null&&cancelAnimationFrame(L.current),z.current?z.current.disconnect():window.removeEventListener(`resize`,c),r.dispose(),a.dispose(),s.dispose(),s.forceContextLoss(),s.domElement&&s.domElement.parentElement===e&&e.removeChild(s.domElement)}},t[4]=N,t[5]=y,t[6]=j,t[7]=w,t[8]=x,t[9]=C,t[10]=S,t[11]=v,t[12]=m,t[13]=g,t[14]=b,t[15]=pe):pe=t[15];let me;t[16]===Symbol.for(`react.memo_cache_sentinel`)?(me=[],t[16]=me):me=t[16],(0,M.useEffect)(pe,me);let Y,he;t[17]!==_||t[18]!==N||t[19]!==ae||t[20]!==y||t[21]!==j||t[22]!==w||t[23]!==x||t[24]!==C||t[25]!==S||t[26]!==p||t[27]!==v||t[28]!==m||t[29]!==g||t[30]!==b?(Y=()=>{let e=R.current,t=I.current;if(!e)return;B.current=p,V.current=_,e.uniforms.uSpeed.value=m,e.uniforms.uScale.value=v,e.uniforms.uFrequency.value=y,e.uniforms.uWarpStrength.value=b,e.uniforms.uMouseInfluence.value=x,e.uniforms.uParallax.value=S,e.uniforms.uNoise.value=C,e.uniforms.uIterations.value=w,e.uniforms.uIntensity.value=j,e.uniforms.uBandWidth.value=N;let n=q,r=(ae||[]).filter(Boolean).slice(0,W).map(n);for(let t=0;t<W;t++){let n=e.uniforms.uColors.value[t];t<r.length?n.copy(r[t]):n.set(0,0,0)}e.uniforms.uColorCount.value=r.length,e.uniforms.uTransparent.value=+!!g,t&&t.setClearColor(0,+!g)},he=[p,_,m,v,y,b,x,S,C,w,j,N,ae,g],t[17]=_,t[18]=N,t[19]=ae,t[20]=y,t[21]=j,t[22]=w,t[23]=x,t[24]=C,t[25]=S,t[26]=p,t[27]=v,t[28]=m,t[29]=g,t[30]=b,t[31]=Y,t[32]=he):(Y=t[31],he=t[32]),(0,M.useEffect)(Y,he);let X,Z;t[33]===Symbol.for(`react.memo_cache_sentinel`)?(X=()=>{let e=R.current,t=P.current;if(!e||!t)return;let n=e=>{let n=t.getBoundingClientRect(),r=(e.clientX-n.left)/(n.width||1)*2-1,i=-((e.clientY-n.top)/(n.height||1)*2-1);U.current.set(r,i)};return t.addEventListener(`pointermove`,n),()=>{t.removeEventListener(`pointermove`,n)}},Z=[],t[33]=X,t[34]=Z):(X=t[33],Z=t[34]),(0,M.useEffect)(X,Z);let Q=`w-full h-full relative overflow-hidden ${n}`,$;return t[35]!==r||t[36]!==Q?($=(0,F.jsx)(`div`,{ref:P,className:Q,style:r}),t[35]=r,t[36]=Q,t[37]=$):$=t[37],$}function q(e){let t=e.replace(`#`,``).trim(),n=t.length===3?[parseInt(t[0]+t[0],16),parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16)]:[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)];return new j(n[0]/255,n[1]/255,n[2]/255)}function J(){return new j(0,0,0)}var fe=()=>{let e=(0,le.c)(14),t=l(),{mode:n,systemMode:r}=_(),i=(n===`system`?r:n)===`dark`,a=i?`#fff`:`#000`,o=i?`#000`:`#fff`,s;return e[0]!==a||e[1]!==o||e[2]!==t.palette.background.paper||e[3]!==t.palette.divider||e[4]!==t.palette.error.main||e[5]!==t.palette.info.main||e[6]!==t.palette.primary.contrastText||e[7]!==t.palette.primary.light||e[8]!==t.palette.primary.main||e[9]!==t.palette.secondary.main||e[10]!==t.palette.success.main||e[11]!==t.palette.text.primary||e[12]!==t.palette.warning.main?(s={divider:t.palette.divider,paper:t.palette.background.paper,primary:t.palette.primary.main,primaryLight:t.palette.primary.light,secondary:t.palette.secondary.main,text:t.palette.text.primary,contrastText:t.palette.primary.contrastText,foreground:a,background:o,success:t.palette.success.main,warning:t.palette.warning.main,error:t.palette.error.main,info:t.palette.info.main,msg:`#fff`},e[0]=a,e[1]=o,e[2]=t.palette.background.paper,e[3]=t.palette.divider,e[4]=t.palette.error.main,e[5]=t.palette.info.main,e[6]=t.palette.primary.contrastText,e[7]=t.palette.primary.light,e[8]=t.palette.primary.main,e[9]=t.palette.secondary.main,e[10]=t.palette.success.main,e[11]=t.palette.text.primary,e[12]=t.palette.warning.main,e[13]=s):s=e[13],s},pe=`tequi1ash0ts`,me=[{id:`vkoMonitoring`,url:`https://github.com/dk-kh/vko-monitoring`,stack:[`TypeScript`,`React`,`Node.js`,`Express`,`PostgreSQL`,`Socket.IO`,`Leaflet`]}],Y=()=>{let e=(0,le.c)(85),{t,i18n:n}=w(),{mode:r,systemMode:i,setMode:a}=_(),o=fe(),l=(r===`system`?i:r)===`dark`,u=n.resolvedLanguage??n.language,d;e[0]!==o.primary||e[1]!==o.primaryLight||e[2]!==o.secondary?(d=[o.primary,o.primaryLight,o.secondary],e[0]=o.primary,e[1]=o.primaryLight,e[2]=o.secondary,e[3]=d):d=e[3];let ie=d,f;e[4]!==l||e[5]!==a?(f=()=>a(l?`light`:`dark`),e[4]=l,e[5]=a,e[6]=f):f=e[6];let m=f,h;e[7]===ie?h=e[8]:(h=(0,F.jsx)(de,{colors:ie,rotation:90,speed:.2,scale:1,frequency:1,warpStrength:1,mouseInfluence:1,noise:.15,parallax:.5,iterations:1,intensity:1.5,bandWidth:6,transparent:!0,autoRotate:0,className:``}),e[7]=ie,e[8]=h);let x;e[9]===Symbol.for(`react.memo_cache_sentinel`)?(x={xs:3,sm:5},e[9]=x):x=e[9];let S=l?`rgba(255,255,255,0.12)`:`rgba(0,0,0,0.08)`,C=l?`rgba(10,10,20,0.55)`:`rgba(255,255,255,0.6)`,T;e[10]!==S||e[11]!==C?(T={width:`100%`,maxWidth:560,maxHeight:`100%`,overflowY:`auto`,p:x,borderRadius:6,border:`1px solid`,borderColor:S,bgcolor:C,backdropFilter:`blur(18px)`,color:`text.primary`},e[10]=S,e[11]=C,e[12]=T):T=e[12];let oe;e[13]===Symbol.for(`react.memo_cache_sentinel`)?(oe={justifyContent:`space-between`,alignItems:`center`},e[13]=oe):oe=e[13];let se;e[14]===t?se=e[15]:(se=t(`portfolio.badge`),e[14]=t,e[15]=se);let E;e[16]===se?E=e[17]:(E=(0,F.jsx)(g,{label:se,color:`primary`,size:`small`}),e[16]=se,e[17]=E);let ce;e[18]===Symbol.for(`react.memo_cache_sentinel`)?(ce={alignItems:`center`},e[18]=ce):ce=e[18];let D;e[19]!==u||e[20]!==n||e[21]!==t?(D=H.map(e=>(0,F.jsx)(ae,{title:t(`portfolio.language`),children:(0,F.jsx)(p,{size:`small`,onClick:()=>ue(n,e),sx:{opacity:u===e?1:.45},children:(0,F.jsx)(`img`,{src:`/images/flags/${e}.svg`,alt:e,width:22,height:16,style:{borderRadius:3,objectFit:`cover`}})})},e)),e[19]=u,e[20]=n,e[21]=t,e[22]=D):D=e[22];let O;e[23]===t?O=e[24]:(O=t(`portfolio.toggleTheme`),e[23]=t,e[24]=O);let k;e[25]===l?k=e[26]:(k=l?(0,F.jsx)(ee,{fontSize:`small`}):(0,F.jsx)(s,{fontSize:`small`}),e[25]=l,e[26]=k);let A;e[27]!==k||e[28]!==m?(A=(0,F.jsx)(p,{size:`small`,onClick:m,children:k}),e[27]=k,e[28]=m,e[29]=A):A=e[29];let j;e[30]!==O||e[31]!==A?(j=(0,F.jsx)(ae,{title:O,children:A}),e[30]=O,e[31]=A,e[32]=j):j=e[32];let M;e[33]!==D||e[34]!==j?(M=(0,F.jsxs)(v,{direction:`row`,spacing:.5,sx:ce,children:[D,j]}),e[33]=D,e[34]=j,e[35]=M):M=e[35];let N;e[36]!==M||e[37]!==E?(N=(0,F.jsxs)(v,{direction:`row`,sx:oe,children:[E,M]}),e[36]=M,e[37]=E,e[38]=N):N=e[38];let P;e[39]===Symbol.for(`react.memo_cache_sentinel`)?(P={mt:4,fontWeight:700,fontSize:{xs:`2rem`,sm:`2.6rem`},lineHeight:1.15},e[39]=P):P=e[39];let I;e[40]===t?I=e[41]:(I=t(`portfolio.name`),e[40]=t,e[41]=I);let L;e[42]===I?L=e[43]:(L=(0,F.jsx)(b,{component:`h1`,sx:P,children:I}),e[42]=I,e[43]=L);let R;e[44]===Symbol.for(`react.memo_cache_sentinel`)?(R={mt:1.5,opacity:.8},e[44]=R):R=e[44];let z;e[45]===t?z=e[46]:(z=t(`portfolio.role`),e[45]=t,e[46]=z);let B;e[47]===t?B=e[48]:(B=t(`portfolio.group`),e[47]=t,e[48]=B);let V;e[49]!==z||e[50]!==B?(V=(0,F.jsxs)(b,{sx:R,children:[z,` · `,B]}),e[49]=z,e[50]=B,e[51]=V):V=e[51];let U;e[52]===Symbol.for(`react.memo_cache_sentinel`)?(U=(0,F.jsx)(ne,{sx:{my:4}}),e[52]=U):U=e[52];let W;e[53]===Symbol.for(`react.memo_cache_sentinel`)?(W={fontWeight:700,fontSize:`1.25rem`,mb:1.5},e[53]=W):W=e[53];let G;e[54]===t?G=e[55]:(G=t(`portfolio.projectsTitle`),e[54]=t,e[55]=G);let K;e[56]===G?K=e[57]:(K=(0,F.jsx)(b,{component:`h2`,sx:W,children:G}),e[56]=G,e[57]=K);let q;e[58]===t?q=e[59]:(q=me.map(e=>(0,F.jsxs)(re,{sx:{p:2.5,borderRadius:3,border:`1px solid`,borderColor:`divider`},children:[(0,F.jsx)(b,{sx:{fontWeight:700},children:t(`portfolio.projects.${e.id}.title`)}),(0,F.jsx)(b,{sx:{mt:.5,opacity:.8},children:t(`portfolio.projects.${e.id}.description`)}),(0,F.jsx)(v,{direction:`row`,sx:{mt:1.5,flexWrap:`wrap`,gap:.75},children:e.stack.map(he)}),(0,F.jsx)(y,{size:`small`,startIcon:(0,F.jsx)(c,{}),href:e.url,target:`_blank`,rel:`noopener noreferrer`,sx:{mt:1.5,ml:-.5,textTransform:`none`},children:t(`portfolio.openRepo`)})]},e.id)),e[58]=t,e[59]=q);let J;e[60]===q?J=e[61]:(J=(0,F.jsx)(v,{spacing:1.5,children:q}),e[60]=q,e[61]=J);let Y;e[62]===Symbol.for(`react.memo_cache_sentinel`)?(Y={fontWeight:700,fontSize:`1.25rem`,mt:4,mb:1.5},e[62]=Y):Y=e[62];let X;e[63]===t?X=e[64]:(X=t(`portfolio.contactsTitle`),e[63]=t,e[64]=X);let Z;e[65]===X?Z=e[66]:(Z=(0,F.jsx)(b,{component:`h2`,sx:Y,children:X}),e[65]=X,e[66]=Z);let Q;e[67]===Symbol.for(`react.memo_cache_sentinel`)?(Q=(0,F.jsx)(te,{}),e[67]=Q):Q=e[67];let $;e[68]===Symbol.for(`react.memo_cache_sentinel`)?($={borderRadius:3,textTransform:`none`},e[68]=$):$=e[68];let ge;e[69]===t?ge=e[70]:(ge=t(`portfolio.telegram`),e[69]=t,e[70]=ge);let _e;e[71]===ge?_e=e[72]:(_e=(0,F.jsxs)(y,{variant:`contained`,startIcon:Q,href:`https://t.me/${pe}`,target:`_blank`,rel:`noopener noreferrer`,sx:$,children:[ge,` · @${pe}`]}),e[71]=ge,e[72]=_e);let ve;e[73]!==N||e[74]!==L||e[75]!==V||e[76]!==K||e[77]!==J||e[78]!==Z||e[79]!==_e||e[80]!==T?(ve=(0,F.jsx)(`div`,{className:`absolute inset-0 flex items-center justify-center p-4 pointer-events-none`,children:(0,F.jsxs)(re,{className:`pointer-events-auto`,sx:T,children:[N,L,V,U,K,J,Z,_e]})}),e[73]=N,e[74]=L,e[75]=V,e[76]=K,e[77]=J,e[78]=Z,e[79]=_e,e[80]=T,e[81]=ve):ve=e[81];let ye;return e[82]!==h||e[83]!==ve?(ye=(0,F.jsxs)(`main`,{className:`w-screen h-screen absolute`,children:[h,ve]}),e[82]=h,e[83]=ve,e[84]=ye):ye=e[84],ye};function he(e){return(0,F.jsx)(g,{label:e,size:`small`,variant:`outlined`},e)}var X=document.querySelector(`#root`);if(!X)throw Error(`Root element not found`);(0,N.createRoot)(X).render((0,F.jsx)(d,{dateAdapter:h,children:(0,F.jsxs)(R,{children:[(0,F.jsx)(f,{}),(0,F.jsx)(M.Suspense,{children:(0,F.jsx)(Y,{})})]})}));