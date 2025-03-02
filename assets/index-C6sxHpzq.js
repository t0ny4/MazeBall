import{ai as Ao,aj as Ut,x as Co,E as B,ak as _o,al as To,f as Ot,i as Yt,S as it,am as zo,an as Ro,F as $o,C as xt,P as He,ao as wt,ap as Wt,aq as _t,ar as Vt,V as Fo,U as Go,R as Io,I as Bo,as as Xt,at as Ho,W as Uo,au as Oo,av as Yo,D as Wo,aw as Vo,ax as Xo,g as Ko}from"./three-BnTik3_w.js";import{W as jo,V as we,C as Zo,B as Me}from"./planck-C4Ttdjc7.js";import{N as se,G as qo}from"./keystrokes-BXin2WUB.js";import{G as Kt,O as Jo}from"./threeaddons-BODZ3vLA.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=o(i);fetch(i.href,r)}})();function rt(...e){let t,o,n,i;if(e.length===0){const l=new Uint32Array(3);window.crypto.getRandomValues(l),e=[l[0],l[1],l[2]]}r(e);function r(l){const f=a();t=f(" "),o=f(" "),n=f(" "),i=1;for(let p=0;p<l.length;p++)t-=f(l[p]),t<0&&(t+=1),o-=f(l[p]),o<0&&(o+=1),n-=f(l[p]),n<0&&(n+=1)}function a(){let l=4022871197;function f(p){p=p.toString();const h=p.length;for(let y=0;y<h;y++){l+=p.charCodeAt(y);let b=.02519603282416938*l;l=b>>>0,b-=l,b*=l,l=b>>>0,b-=l,l+=b*4294967296}return(l>>>0)*23283064365386963e-26}return f}function c(l){return parseInt(l,10)===l}function u(){const l=2091639*t+i*23283064365386963e-26;return t=o,o=n,n=l-(i=l|0),n}return u.fract53=function(){return u()+(u()*2097152|0)*11102230246251565e-32},u.int32=function(){return u()*4294967296},u.cycle=function(l){l=typeof l>"u"?1:Number(l),l<1&&(l=1);for(let f=0;f<l;f++)u()},u.range=function(l=0,f=0){if(l===0&&f===0)return 0;if(l>f){const p=l;l=f,f=p}return c(l)&&c(f)?Math.floor(u()*(f-l+1))+l:u()*(f-l)+l},u.restart=function(){r(e)},u.seed=function(...l){r(l)},u}const Qo={_MODULE:"global.js",cameraYpos:0,idleStartMs:0,firstPersonModeActive:!1,mazeExited:!1,orbitControlsEnabled:!1,idleMode:!1,camera:null,exitLight:null,fog:null,physicsWorld:null,playerLight:null,renderer:null,renderUpdate:()=>{console.warn("global.renderUpdate not set")},scene:null,errorTexture:null,errorMesh:null,statusBar:null},No={get(e,t){if(t in e)return e[t];throw console.error('Cannot read non existent property "'+t+'" from global'),new Error},set(e,t,o){if(t in e)return e[t]=o,!0;throw console.error('Cannot create new property "'+t+'" on global'),new Error},deleteProperty(e,t){throw console.error('Cannot delete property "'+t+'" from global'),new Error}},s=new Proxy(Object.seal(Qo),No),en={_MODULE:"config.js",ballRadius:.3,bgColour:1048576,playerLightLevel:.9,textureDir:"./textures/128/",randomSeed:0,soundsDir:"./sounds/",modelDir:"./models/",keyModelFile:"Key.glb",baseModelFile:"TeleporterBase.glb",doorModelFile:"ArchDoor.glb",keySounds:{keyPickup:{filename:"DM-CGS-07.ogg",volume:.4}},keySoundGroups:{},ballTextureFile:"Tile1.png",minVelocity:.1,exitLightY:.4,floorTextureFiles:["Tile8.png","Tile16.png","Tile24.png","Tile25.png"],mazeHeight:1.2,wallTextureFiles:["Tile11.png","Tile4.png","Tile18.png","Tile20.png","Tile21.png","Tile23.png"],mazeSounds:{locked:{filename:"DM-CGS-10.ogg",volume:.3},dm12:{filename:"DM-CGS-12.ogg",volume:.25},dm26:{filename:"DM-CGS-26.ogg",volume:.4},wallhit:{filename:"DM-CGS-03.ogg",volume:.05}},mazeSoundGroups:{mazeExit:["dm12","dm26"]},teleportModelFile:"ArchRound.glb",teleportSounds:{teleport:{filename:"DM-CGS-42.ogg",volume:.1}},controlKeys:{up:["ArrowUp","w","k"],down:["ArrowDown","s","j"],left:["ArrowLeft","a","h"],right:["ArrowRight","d","l"]},keys:{orbit_controls:"control>enter",house_lights:"shift>enter",first_person:"+",jump:"@Space"},mouseSensitivity:.005,idleTimeout:15,keyForce:.4,lightYpos:1.4,jumpSounds:{jump:{filename:"DM-CGS-21.ogg",volume:.3}},cameraEase:.08,cameraExitEase:.04,defaultCameraY:4,enableShadows:!0,exitLightLevel:.5,sunLightLevel:.4},tn={get(e,t){if(t in e)return e[t];throw console.error('Cannot read non existent property "'+t+'" from config'),new Error},set(e,t){throw console.error('Cannot write to property "'+t+'" on config'),new Error},deleteProperty(e,t){throw console.error('Cannot delete property "'+t+'" from config'),new Error}},d=new Proxy(Object.freeze(en),tn);let z=null,Tt=0,st=0,Mt=0,at=0,_e=0,zt=0;function on(){return z=document.createElement("div"),z.id="statusBar",z.classList.add("status"),document.body.append(z),Tt=z===null?0:z.clientHeight,Tt}function lt(...e){z&&(z.innerHTML=e.join(" "))}function nn(e){e!==st&&(st=e,Mt=0,at=0,vt())}function rn(){Mt++,vt()}function sn(e){at+=e,_e=Math.round(at),_e!==zt&&(zt=_e,vt())}function vt(){z.innerHTML="Level: "+st+" &nbsp; Distance Rolled: "+_e+" &nbsp; Wall Impacts: "+Mt}function an(){const o=new Uint8Array(1024);for(let i=0;i<1024;i+=4)o[i]=255,o[i+1]=105,o[i+2]=180,o[i+3]=255;const n=new Ao(o,16,16);return n.needsUpdate=!0,n}function ln(){const e=new Ut(.1),t=new Co({color:16738740});return new B(e,t)}function cn(e,t){let o=!1,n=!1;const i=new _o;i.onError=r=>{console.warn("Failed to load asset:",r),n=!0},i.onProgress=function(r,a,c){lt("Loaded",Math.floor(a/c*100)+"%")},i.onLoad=()=>{o&&(n&&console.error("LoadingManager: finished loading asset files with errors"),lt(""),t())},e.forEach(r=>{typeof r.loadAssets=="function"?r.loadAssets(i):console.warn(r,"has no loadAssets method")}),o=!0}const dn=Math.PI/2,K=rt();function un(e,t,o){const n=e<3?3:e|1,i=t<3?3:t|1,r={x:n,z:i},a=o===void 0?Math.random().toString().substring(2):o;K.seed(a);const c={size:r,data:Array.from({length:r.x},()=>Array(r.z).fill(!1)),deadends:[],seed:a},u=pn(r);return c.start=u.start,c.start.angle=0,c.end=u.end,c.exit=u.exit,c.data[c.exit.x][c.exit.z]="H",c}function fn(e,t,o){const n=un(e,t,o);jt(n,n.start.x,n.start.z);const{x:i,z:r}=n.start;let a=0;return n.data[i-1][r]!==!1?a=1:n.data[i][r+1]!==!1?a=2:n.data[i+1][r]!==!1&&(a=3),n.data[n.start.x][n.start.z]="S",n.data[n.end.x][n.end.z]="E",n.start.angle=a*dn,n}function jt(e,t,o){let n=t===e.end.x&&o===e.end.z;for(;;){const i=[];let r;if(o<e.size.z-3&&e.data[t][o+2]===!1&&i.push([0,1]),t<e.size.x-3&&e.data[t+2][o]===!1&&i.push([1,0]),o>2&&e.data[t][o-2]===!1&&i.push([0,-1]),t>2&&e.data[t-2][o]===!1&&i.push([-1,0]),i.length===0)return n?e.data[t][o]="*":e.data[t][o]===!1&&(e.data[t][o]="D",e.deadends.push({x:t,z:o})),n;if(e.data[t][o]="",i.length===1?[r]=i:r=i[Math.floor(K()*i.length)],jt(e,t+r[0]*2,o+r[1]*2)?(e.data[t+r[0]][o+r[1]]="*",n=!0):e.data[t+r[0]][o+r[1]]="",i.length===1)return n&&(e.data[t][o]="*"),n}}function pn(e){const t={},o={};let n=K()>.5,i=K()>.5;t.x=i?1:e.x-2,t.z=n?1:e.z-2;const r=K();r>.5?(n=!n,i=!i):r>.25?n=!n:i=!i,o.x=i?1:e.x-2;const a=i?-1:1;o.z=n?1:e.z-2;const c=n?-1:1,u={...o};return K()>.5?(o.z+=c,o.dir=n?"U":"D"):(o.x+=a,o.dir=i?"L":"R"),{start:t,end:u,exit:o}}let j;const L={};function gn(){j=new jo({gravity:new we(0,0)}),j.addContactCallback=hn,s.physicsWorld=j,j.on("begin-contact",e=>{const t=e.m_nodeA.other.m_userData,o=e.m_nodeB.other.m_userData;if(t===void 0||o===void 0)return;const n=typeof t=="object"?t.name:t,i=typeof o=="object"?o.name:o;if(!L[n]||!L[n][i])return;const r=L[n][i],a=performance.now();if(!(a-r.last<250)){if(r.last=a,typeof r.callback=="function"){r.callback(e,t,o);return}r.callback.forEach(c=>{c(e,t,o)})}})}function hn(e,t,o){if(L[e]||(L[e]={}),!L[e][t]){L[e][t]={},L[e][t].last=0,L[e][t].callback=o;return}if(typeof L[e][t].callback=="function"){const n=L[e][t].callback;L[e][t].callback=[n]}L[e][t].callback.push(o)}function yn(){j.step(1/60),j.clearForces()}let Z=0,q=0;function mn(){function e(){q+=1}function t(){q-=1}function o(){Z-=1}function n(){Z+=1}se(d.controlKeys.up,{onPressed:t,onReleased:e}),se(d.controlKeys.down,{onPressed:e,onReleased:t}),se(d.controlKeys.left,{onPressed:o,onReleased:n}),se(d.controlKeys.right,{onPressed:n,onReleased:o})}function xn(e){addEventListener("pointermove",e,!1)}function wn(e){removeEventListener("pointermove",e)}function Ue(e,t,o=void 0){if(!d.keys[e]){console.error("Unknown key index: "+e);return}const n=d.keys[e];n.includes(">")?qo(n,{onPressed:t,onReleased:o}):se(n,{onPressed:t,onReleased:o})}const Rt=new we(0,0),ke=new Ot,H=d.ballRadius,$t=d.minVelocity;let M,N,Te,Zt=()=>{console.warn("gUpdateMazePosition not set")};function Mn(e){new Yt(e).load(d.textureDir+"ball/"+d.ballTextureFile,o=>{Te=o,Te.colorSpace=it},void 0,()=>{Te=s.errorTexture})}function vn(e){typeof e=="function"&&(Zt=e),N=s.physicsWorld.createBody({type:"dynamic",position:Rt,awake:!1,fixedRotation:!0,userData:"ball"}),N.createFixture({shape:new Zo(Rt,H),restitution:.15,density:.2});const t=new Ut(H),o=new To({map:Te});return M=new B(t,o),M.position.y=H,M.castShadow=!0,s.scene.add(M),[N,M]}function bn(){if(N.isAwake()){const i=N.getLinearVelocity();i.mul(.98),Math.abs(i.x)<$t&&Math.abs(i.y)<$t&&(i.x=0,i.y=0)}const e=N.getPosition(),t=e.y,o=e.x-M.position.x,n=t-M.position.z;if(o!==0||n!==0){M.position.set(e.x,M.position.y,t);const i=Math.sqrt(o*o+n*n);return Zt(e.x,H,t,i),s.firstPersonModeActive||(ke.makeRotationZ(-o/H),M.matrix.premultiply(ke),ke.makeRotationX(n/H),M.matrix.premultiply(ke),M.rotation.setFromRotationMatrix(M.matrix)),!0}return!1}function Ln(){return H}function Pn(e){M.visible=!e}const ae={},R={},U={},le={};let fe=null,Oe=!1,qt=!1;function Sn(e){const t=new $o(e);t.setResponseType("arraybuffer");for(const o in U)Object.hasOwn(U,o)&&t.load(d.soundsDir+U[o].filename,n=>{ae[o]=n.transfer()})}function Le(e){for(const t in e)if(Object.hasOwn(e,t)){const o=e[t];typeof o=="string"?U[t]={filename:o,volume:1}:typeof o=="object"&&o.filename&&(U[t]={filename:o.filename},U[t].volume=o.volume?o.volume:1)}}function bt(e){for(const t in e)Object.hasOwn(e,t)&&(le[t]=e[t])}function Jt(){document.body.addEventListener("click",()=>{Oe||Nt()},{once:!0}),qt=/firefox/i.test(navigator.userAgent),document.body.addEventListener("keydown",Qt,{once:!0})}function Qt(e){if(qt&&e.key.length>1){Oe||document.body.addEventListener("keydown",Qt,{once:!0});return}Oe||Nt()}function Nt(){fe=new zo,s.camera.add(fe);const e=new AudioContext;for(const t in ae)Object.hasOwn(ae,t)&&(R[t]||(R[t]=new Ro(fe),e.decodeAudioData(ae[t],o=>{R[t].setBuffer(o),R[t].setLoop(!1),R[t].setVolume(U[t].volume),delete ae[t]})));Oe=!0}function Y(e){return fe===null?!0:R[e]?(R[e].isPlaying&&R[e].stop(),R[e].play(),!0):!1}function eo(e){if(fe===null)return!0;if(le[e]){const t=le[e].length;if(t>0){const o=Math.floor(Math.random()*t),n=le[e][o];return Y(n)?!0:(le[e].splice(o,1),!1)}else return!1}return!1}const kn="sounds.js",Dn=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:kn,addAssets:Le,addGroups:bt,loadAssets:Sn,play:Y,playFromGroup:eo,setup:Jt},Symbol.toStringTag,{value:"Module"})),to=Math.PI/2,En=new xt(16711680),An=new xt(65280);let D,Lt,A,ee,te,pe,S,E=null,Pt,St,ze,kt=!1,Ye=!1,ie;function oo(){ie=s.physicsWorld,D=s.scene,Lt=s.exitLight,pe=new He(16766720,0),D.add(pe),ee=new He(16766720,0),D.add(ee),Pt=new Me(.5,.04),St=new Me(.04,.5),ie.addContactCallback("ball","closed_door",()=>{Y("locked")}),kt=!0}function Cn(e){const t=new Kt(e);t.load(d.modelDir+d.keyModelFile,o=>{A=o.scene,A.traverse(n=>{n instanceof B&&(n.material.emissive={b:0,r:1,g:.7,isColor:!0},n.material.emissiveIntensity=.55)}),A.scale.set(.6,.6,.6)},void 0,()=>{A=s.errorMesh.clone()}),t.load(d.modelDir+d.baseModelFile,o=>{te=o.scene,te.scale.set(.35,.1,.35)},void 0,()=>{te=s.errorMesh.clone()}),t.load(d.modelDir+d.doorModelFile,o=>{S=o.scene,S.scale.set(.42,.4,.3)},void 0,()=>{S=s.errorMesh.clone()}),Le(d.keySounds),bt(d.keySoundGroups)}function no(e){if(!kt)return;E!==null&&(ie.destroyBody(E),E=null),D.remove(A),D.remove(te),D.remove(S),pe.intensity=0,ee.intensity=0,Ye=!1;const t=e;if(ze=t,t.deadends.length===0){t.key=!1,t.keyIndex=!1;return}const o=Math.floor(Math.random()*t.deadends.length);t.key=t.deadends[o],t.keyIndex=o,t.data[t.key.x][t.key.z]="K";const{x:n,z:i}=t.exit;t.data[n][i]="L";let r=t.exit.x,a=t.exit.z,c;t.exit.dir==="L"||t.exit.dir==="R"?(S.rotation.set(0,to,0),r+=t.exit.dir==="R"?.5:-.5,c=St):(S.rotation.set(0,0,0),a+=t.exit.dir==="D"?.5:-.5,c=Pt);const u={type:"static",position:{x:r,y:a},userData:"closed_door"};E=ie.createBody(u),E.createFixture({shape:c}),te.position.set(t.key.x,0,t.key.z),D.add(te),pe.position.set(t.key.x,.1,t.key.z),pe.intensity=.04,A.position.set(t.key.x,.38,t.key.z),D.add(A),ee.position.set(t.key.x,.44,t.key.z),ee.intensity=.1,Ye=!0,S.position.set(r,0,a),D.add(S),Lt.color=En}function io(){return!kt||!Ye||s.idleMode?!1:(A.rotateY(.03),A.rotateZ(.03),!0)}function ro(){D.remove(A),ee.intensity=0,Ye=!1,Y("keyPickup");const{x:e,z:t}=ze.exit;ze.data[e][t]="H",E!==null&&(ie.destroyBody(E),E=null);const o=ze.exit.dir;let n=S.position.x,i=S.position.z,r,a=0;o==="L"||o==="R"?(n+=o==="R"?.5:-.5,i+=.5,r=Pt):(a=to,n+=.5,i+=o==="D"?.5:-.5,r=St);const c={type:"static",position:{x:n,y:i},userData:"open_door"};E=ie.createBody(c),E.createFixture({shape:r}),S.position.set(n,0,i),S.rotation.set(0,a,0),Lt.color=An}const _n="key.js",Tn=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:_n,collect:ro,create:no,loadAssets:Cn,setup:oo,update:io},Symbol.toStringTag,{value:"Module"})),Ft=`

uniform float u_ticks;
uniform float u_opacity;
uniform vec3 u_rgb;
varying vec2 v_Uv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec3 color = vec3(0.01);
    for (float i = 0.0; i < 10.0; i++) {
        float t = u_ticks * 0.1 + i;
        vec2 blobPos = vec2(random(vec2(i, t)) * 2.0 - 1.0, random(vec2(i + 1.0, t)) * 2.0 - 1.0);
        float d = length(v_Uv - blobPos);
        float intensity = clamp(0.01 / (d * d), 0.0, 0.3);
        color += vec3(intensity * u_rgb.r, intensity * u_rgb.g, intensity * u_rgb.b);
    }
    gl_FragColor = vec4(color, u_opacity);
}

`,Gt=`

varying vec2 v_Uv;

void main() {
    v_Uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`,{PI:ve}=Math,De=ve/2,zn=ve*2;let Re,so,ao,lo,ge,qe=!1;const Rn=new Me(.5,.01),$n=new Me(.01,.5),G=[];let ct,dt,re,Dt,Je;function Fn(e){new Kt(e).load(d.modelDir+d.teleportModelFile,o=>{Re=o.scene,Re.scale.set(.34,.34,2)},void 0,()=>{Re=s.errorMesh.clone()}),Le(d.teleportSounds)}function Gn(){re=s.physicsWorld,Dt=s.scene,ge=new wt;const e=new Wt(.79,1.08);ct=new _t({uniforms:{u_ticks:{value:1},u_opacity:{value:.6},u_rgb:{value:{r:.5,g:.5,b:0}}},vertexShader:Gt,fragmentShader:Ft,transparent:!0}),dt=new _t({uniforms:{u_ticks:{value:0},u_opacity:{value:.92},u_rgb:{value:{r:0,g:.4,b:.3}}},vertexShader:Gt,fragmentShader:Ft,transparent:!0}),so=new B(e,ct),ao=new B(e,dt);const t=new Vt(1,d.mazeHeight,.14);In(t,.14),lo=new B(t,ge),re.addContactCallback("ball","teleporter",Un),qe=!0,Je=!1}function In(e,t){const o=e.getAttribute("uv");[0,4,10,14,21,23,25,27].forEach(n=>{o.array[n]=t}),[2,6,17,19].forEach(n=>{o.array[n]=0}),o.needsUpdate=!0}function Bn(e,t){if(!qe||e.size.z<11)return;Hn(),ge.map&&ge.map.dispose(),ge.map=t.clone();const o=Math.floor((e.size.z-1)/2);if(Ee(1,0,o,"R",2),Ee(2,e.size.x-1,o,"L",1),e.data[0][o]="T",e.data[e.size.x-1][o]="T",e.data[1][o]===!1&&(e.data[1][o]=""),e.data[e.size.x-2][o]===!1&&(e.data[e.size.x-2][o]=""),e.size.x>13){const n=Math.floor((e.size.x-1)/2);Ee(3,n,0,"D",4),Ee(4,n,e.size.z-1,"U",3),e.data[n][0]="T",e.data[n][e.size.z-1]="T",e.data[n][1]===!1&&(e.data[n][1]=""),e.data[n][e.size.z-2]===!1&&(e.data[n][e.size.z-2]="")}G.forEach(n=>{n.active&&Dt.add(n.meshGroup)}),Je=!0}function Hn(){G.forEach(e=>{Dt.remove(e.meshGroup),e.triggerBody!==null&&(re.destroyBody(e.triggerBody),e.triggerBody=null),e.rearBoxBody!==null&&(re.destroyBody(e.rearBoxBody),e.rearBoxBody=null),e.active=!1}),Je=!1}function Ee(e,t,o,n,i){const r={x:0,z:0,meshRotation:0};let a;switch(n){case"R":r.x=-1,r.meshRotation=De,a=-De;break;case"L":r.x=1,r.meshRotation=-De,a=De;break;case"D":r.z=-1,r.meshRotation=0,a=0;break;case"U":r.z=1,r.meshRotation=ve,a=ve;break;default:console.warn("invalid entrySide value:",n);return}G[e]||(G[e]={meshGroup:null});const c=G[e];if(c.meshGroup===null){c.meshGroup=new Go;const f=Re.clone();f.position.set(0,0,.23),c.meshGroup.add(f);const p=so.clone();p.position.set(0,.5,-.12),c.meshGroup.add(p);const h=ao.clone();h.position.set(0,.5,-.27),c.meshGroup.add(h);const y=lo.clone();y.position.set(0,d.mazeHeight/2,-.43),c.meshGroup.add(y)}c.meshGroup.position.set(t,0,o),c.meshGroup.rotation.set(0,r.meshRotation,0);const u=r.x!==0?$n:Rn,l={type:"static",position:{x:t+r.x*.44,y:o+r.z*.44},userData:{name:"teleporter",id:e}};c.triggerBody=re.createBody(l),c.triggerBody.createFixture({shape:u}),l.position={x:t+r.x*.5,y:o+r.z*.5},l.userData={},c.rearBoxBody=re.createBody(l),c.rearBoxBody.createFixture({shape:u}),c.index=e,c.target=i,c.exit={x:t+r.x*.08,z:o+r.z*.08},c.cameraRotation=a,c.active=!0}function Un(e,t,o){if(!qe)return;const n=G[o.id];if(!n.target){console.warn("no destination teleporter set:",o.id);return}if(!G[n.target]){console.warn("destination teleporter does not exist:",n.target);return}const i=G[n.target];if(!i.exit){console.warn("destination has no exit data:",n.target);return}const r=(i.cameraRotation-n.cameraRotation+ve)%zn,a=wo().clone(),c=new Fo(a.x,a.y);c.rotateAround({x:0,y:0},r),c.multiplyScalar(.75),bo(i.exit,c,r),Y("teleport")}function On(){return!qe||!Je||s.idleMode?!1:(ct.uniforms.u_ticks.value+=2e-7,dt.uniforms.u_ticks.value+=9e-8,!0)}const It=Math.PI/2,be=[],We=[],Ae=[],co=[],m={x:0,z:0,type:""};let J,$e,he,C,k,Q,ut=.9,Ve;function uo(){Ve=s.physicsWorld,J=s.scene,$e=s.camera,he=new He(65280,0),J.add(he),s.exitLight=he,Q={size:{x:0,z:0}},Ve.addContactCallback("ball","wall",e=>{const t=e.getManifold().localNormal,o=e.getFixtureB().getBody().getLinearVelocity(),n=Math.abs(o.x*t.x),i=Math.abs(o.y*t.y);(n>ut||i>ut)&&(Y("wallhit"),rn())}),Gn()}function Yn(e){const t=new Yt(e);for(const o of d.wallTextureFiles)t.load(d.textureDir+"walls/"+o,n=>{n.colorSpace=it,be.push(n)},void 0,()=>{be.push(s.errorTexture)});for(const o of d.floorTextureFiles)t.load(d.textureDir+"floors/"+o,n=>{n.colorSpace=it,We.push(n)},void 0,()=>{We.push(s.errorTexture)});Le(d.mazeSounds),bt(d.mazeSoundGroups),Fn(e)}function fo(e,t=.9){Q=e,ut=t;const o=Math.floor(Math.random()*be.length);Bn(e,be[o]),Ae.length>0&&(Ae.forEach(p=>Ve.destroyBody(p)),Ae.length=0);const n={type:"static",position:{x:0,y:0},userData:"wall"},i=new Me(.5,.5);for(let p=0;p<e.size.x;p++)for(let h=0;h<e.size.z;h++)if(e.data[p][h]===!1){n.position={x:p,y:h};const y=Ve.createBody(n);Ae.push(y),y.createFixture({shape:i})}const r=e.size.x,a=e.size.z;C&&(J.remove(C),C.geometry.dispose(),C.material.dispose(),C=null),k&&(J.remove(k),k.geometry.dispose(),k.material.dispose(),k=null),C=Wn(e,o),C.castShadow=!0,C.receiveShadow=!0,J.add(C);const c=Math.floor(Math.random()*We.length),u=We[c];u.wrapS=u.wrapT=Io,u.repeat.set(r+15,a+15);const l=new Wt(r+15,a+15),f=new wt({map:u});k=new B(l,f),k.rotateX(-It),k.position.set((r-1)/2,0,(a-1)/2),k.receiveShadow=!0,J.add(k),s.firstPersonModeActive?$e.rotation.set(0,e.start.angle,0):$e.rotation.set(-It,0,0),$e.position.set(e.start.x,s.cameraYpos,e.start.z),he.position.set(e.exit.x,d.exitLightY,e.exit.z),he.intensity=0,s.mazeExited=!1}function Wn(e,t){const o=new Vt(1,d.mazeHeight,1),n=be[t],i=new wt({map:n}),r=new Bo(o,i,e.size.x*e.size.z);r.count=0;const a=new Ot;for(let c=0;c<e.size.x;c++)for(let u=0;u<e.size.z;u++)e.data[c][u]===!1&&(a.setPosition(c,d.mazeHeight/2,u),r.setMatrixAt(r.count++,a));return r}function po(e,t,o,n){sn(n);const i=Math.floor(e+.5),r=Math.floor(o+.5),a={x:m.x,z:m.z},c={x:e,z:o};if(i===a.x&&r===a.z)return;const u=m.type;m.x=i,m.z=r,i>=0&&i<Q.size.x&&r>=0&&r<Q.size.z?m.type=Q.data[m.x][m.z]:m.type="O",m.type!==u&&(m.type==="K"&&(ro(),Q.data[m.x][m.z]="D"),co.forEach(l=>{(l.from===null||l.from===u)&&(l.to===null||l.to===m.type)&&l.callback(u,m.type,a,c)}))}function Vn(e,t=null,o=null){co.push({from:o,to:t,callback:e})}function Et(){return m}function go(){return On()}const Xn="maze.js",Kn=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:Xn,create:fo,getPlayerGridInfo:Et,loadAssets:Yn,registerOnTypeChange:Vn,setup:uo,update:go,updatePlayerPosition:po},Symbol.toStringTag,{value:"Module"}));let Ne=1,ce=-1,At,oe=null,ye=null,Fe=!1,Ce=!1,Xe,Ke,ft=!1;function jn(){Le(d.jumpSounds)}function Zn(e){Xe=s.camera,Ke=s.playerLight,At=e.position.y,Ue("jump",()=>{ft=!0},()=>{ft=!1})}function qn(e){if(!Fe&&!ft)return!1;const{firstPersonModeActive:t}=s;if(Fe||(Fe=!0,Ce=t,Et().type==="T"?Ne=.5:Ne=Ce?1.2:.6,ce=-1,Ce&&(oe=Xe.position.y),ye=Ke.position.y,Y("jump")),t!==Ce)return oe=null,pt(e),!0;if(ce+=.05,ce>1)return pt(e),!0;const o=1-ce**2,n=Ne*o;return t&&(Xe.position.y=oe+n),e.position.y=At+n,Ke.position.y=ye+n,!0}function pt(e){e.position.y=At,ye!==null&&(Ke.position.y=ye,ye=null),oe!==null&&(s.firstPersonModeActive&&(Xe.position.y=oe),oe=null),ce=-1,Fe=!1}let I,Pe,F,ne=0,ho=()=>{console.warn("gUpdateMazePosition not set")},de=null,Ge=null,ue=null;const et=new Xt(0,0,0,"YZX");let gt;const Jn=new we(0,0),yo=Math.PI/4,Qn=Math.sin(yo),Nn=Math.cos(yo);function ei(e){Mn(e),jn()}function mo(e){gt=s.camera,typeof e=="function"&&(ho=e),[Pe,I]=vn(e),F=new He(16769248,d.playerLightLevel),F.castShadow=!1,s.scene.add(F),s.playerLight=F,Zn(I)}function ht(){if(de!==null&&(vo(de.x,de.z),de=null,Ge!==null&&(xo(Ge),Ge=null),ue!==null&&(s.firstPersonModeActive&&(et.setFromQuaternion(gt.quaternion),et.y-=ue,gt.quaternion.setFromEuler(et),ne+=ue),ue=null)),Z!==0||q!==0){let t;if(Z!==0&&q!==0?t=new we(Z*Nn,q*Qn):t=new we(Z,q),t.mul(d.keyForce),s.firstPersonModeActive){const o=Math.cos(ne),n=Math.sin(ne),i=o*t.x-n*t.y,r=n*t.x+o*t.y;t.x=i,t.y=r}ti(t)}F.position.x=I.position.x,F.position.z=I.position.z;let e=bn();return e|=qn(I),e&&(s.idleStartMs=0,s.idleMode=!1),!e&&!s.idleMode&&(s.idleStartMs===0?s.idleStartMs=Date.now():Date.now()-s.idleStartMs>d.idleTimeout*1e3&&(s.idleMode=!0)),e}function xo(e){Pe.setLinearVelocity(e)}function wo(){return Pe.getLinearVelocity()}function Mo(e){xo(Jn),vo(e.start.x,e.start.z),ne=-e.start.angle,F.position.set(e.start.x,d.lightYpos,e.start.z),F.intensity=0,pt(I)}function vo(e,t){const o=Qe();I.position.set(e,o.y,t),Pe.setPosition({x:e,y:t}),ho(e,o.y,t,0)}function bo(e,t=null,o=null){de=e,Ge=t,ue=o}function Qe(){return I.position}function Lo(){return Ln()}function ti(e){Pe.applyForceToCenter(e)}function Po(){return ne}function So(e){ne=e}function yt(e){Pn(e)}const oi="player.js",ni=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:oi,deferredPositionUpdate:bo,getAngle:Po,getCameraHeight:Lo,getLinearVelocity:wo,getPosition:Qe,hideMesh:yt,loadAssets:ei,setAngle:So,setNewMaze:Mo,setup:mo,update:ht},Symbol.toStringTag,{value:"Module"}));let x,X,P,T;function ii(e,t,o=document.body){s.renderUpdate=Ct,s.cameraYpos=d.defaultCameraY,X=new Ho,s.scene=X,P=new Uo(80,window.innerWidth/window.innerHeight),s.camera=P,T=new Oo({antialias:!0}),s.renderer=T,T.shadowMap.enabled=d.enableShadows,T.shadowMap.type=Yo,o.appendChild(T.domElement),T.setPixelRatio(window.devicePixelRatio),T.setSize(e,t),window.addEventListener("resize",ai),X.background=new xt(d.bgColour),x=new Wo(16777215,d.sunLightLevel),x.castShadow=!0,x.position.set(5,20,5),x.shadow.camera.left=-10,x.shadow.camera.right=10,x.shadow.camera.top=0,x.shadow.camera.bottom=-20,x.shadow.camera.near=10,x.shadow.camera.far=25,X.add(x),s.fog=new Vo(d.bgColour,5,10),X.fog=s.fog}function Ct(e=!0){let t=!1;if(!s.orbitControlsEnabled){const o=Qe();if(s.firstPersonModeActive)P.position.x=o.x,P.position.z=o.z;else{const n=o.x-P.position.x,i=o.z-P.position.z;if(n!==0||i!==0){t=!0;const r=s.mazeExited?d.cameraExitEase:d.cameraEase;r>=1||Math.abs(n)<.008&&Math.abs(i)<.008?(P.position.x=o.x,P.position.z=o.z):(P.position.x+=n*r,P.position.z+=i*r)}}}(e||t)&&T.render(X,P)}function ri(){const e=.1*(d.playerLightLevel-s.playerLight.intensity),t=.1*(d.sunLightLevel-x.intensity);return s.playerLight.intensity+=e,x.intensity+=t,e<.01?(s.playerLight.intensity=d.playerLightLevel,s.exitLight.intensity=d.exitLightLevel,x.intensity=d.sunLightLevel,!0):!1}function si(){const e=.04*s.playerLight.intensity;return s.playerLight.intensity-=e,s.exitLight.intensity-=e,x.intensity-=e/2,e<.01?(s.playerLight.intensity=0,s.exitLight.intensity=0,x.intensity=0,!0):!1}function ai(){P.aspect=window.innerWidth/window.innerHeight,P.updateProjectionMatrix(),T.setSize(window.innerWidth,window.innerHeight),Ct()}var me=function(){var e=0,t=document.createElement("div");t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",function(f){f.preventDefault(),n(++e%t.children.length)},!1);function o(f){return t.appendChild(f.dom),f}function n(f){for(var p=0;p<t.children.length;p++)t.children[p].style.display=p===f?"block":"none";e=f}var i=(performance||Date).now(),r=i,a=0,c=o(new me.Panel("FPS","#0ff","#002")),u=o(new me.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var l=o(new me.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:t,addPanel:o,showPanel:n,begin:function(){i=(performance||Date).now()},end:function(){a++;var f=(performance||Date).now();if(u.update(f-i,200),f>=r+1e3&&(c.update(a*1e3/(f-r),100),r=f,a=0,l)){var p=performance.memory;l.update(p.usedJSHeapSize/1048576,p.jsHeapSizeLimit/1048576)}return f},update:function(){i=this.end()},domElement:t,setMode:n}};me.Panel=function(e,t,o){var n=1/0,i=0,r=Math.round,a=r(window.devicePixelRatio||1),c=80*a,u=48*a,l=3*a,f=2*a,p=3*a,h=15*a,y=74*a,b=30*a,W=document.createElement("canvas");W.width=c,W.height=u,W.style.cssText="width:80px;height:48px";var g=W.getContext("2d");return g.font="bold "+9*a+"px Helvetica,Arial,sans-serif",g.textBaseline="top",g.fillStyle=o,g.fillRect(0,0,c,u),g.fillStyle=t,g.fillText(e,l,f),g.fillRect(p,h,y,b),g.fillStyle=o,g.globalAlpha=.9,g.fillRect(p,h,y,b),{dom:W,update:function(Se,Eo){n=Math.min(n,Se),i=Math.max(i,Se),g.fillStyle=o,g.globalAlpha=1,g.fillRect(0,0,c,h),g.fillStyle=t,g.fillText(r(Se)+" "+e+" ("+r(n)+"-"+r(i)+")",l,f),g.drawImage(W,p+a,h,y-a,b,p,h,y-a,b),g.fillRect(p+y-a,h,a,b),g.fillStyle=o,g.globalAlpha=.9,g.fillRect(p+y-a,h,a,r((1-Se/Eo)*b))}}};let tt=!1,v,xe,Bt,je,O,Ze;function li(){O=s.camera,Ze=s.scene,je=new me,document.body.appendChild(je.dom),Ue("orbit_controls",di),Ue("house_lights",ui),v=new Jo(O,s.renderer.domElement),v.enableDamping=!0,v.enabled=!1,v.minPolarAngle=.02,v.maxPolarAngle=Math.PI-.05,xe=new Xo(13421772,1),xe.intensity=0,Ze.add(xe)}function ci(){return je&&je.update(),v.enabled?(v.update(),!0):!1}function di(){if(s.firstPersonModeActive){console.log("Cannot activate orbit controls while in first person view");return}v.enabled=!v.enabled,s.orbitControlsEnabled=v.enabled;const e=Qe();v.enabled?(console.log("Orbit controls enabled"),Bt=O.position.y,v.target.set(e.x,e.y,e.z)):(console.log("Orbit controls disabled"),O.position.set(e.x,Bt,e.z),O.rotation.set(3*Math.PI/2,0,0),s.renderUpdate())}function ui(){tt=!tt,tt?(xe.intensity=1,Ze.fog=null,console.log("House lights up")):(xe.intensity=0,Ze.fog=s.fog,console.log("House lights down")),s.renderUpdate()}function fi(){v&&v.target.set(O.position.x,d.ballRadius,O.position.z)}const V=new Xt(0,0,0,"YZX"),ot=new Ko,pi="pointerLockElement"in document;let Ie=0,Be=0,$;const mt=Math.PI/2;function gi(){if(!pi){console.log("browser does not support pointer lock, no first person view available");return}$=s.camera,Ue("first_person",hi),document.addEventListener("pointerlockchange",()=>{if(s.orbitControlsEnabled){document.pointerLockElement&&(console.log("Cannot switch to first person view while orbit controls are active"),document.exitPointerLock());return}s.firstPersonModeActive?(document.exitPointerLock(),$.rotation.set(-mt,0,0),$.position.y=s.cameraYpos=d.defaultCameraY,wn(Ht),yt(!1),s.firstPersonModeActive=!1,console.log("first person view disabled")):($.rotation.set(0,-Po(),0),$.position.y=s.cameraYpos=Lo(),xn(Ht),yt(!0),s.firstPersonModeActive=!0,console.log("first person view enabled")),s.renderUpdate()})}function hi(){s.firstPersonModeActive?document.exitPointerLock():s.renderer.domElement.requestPointerLock()}function Ht(e){const t=e.movementX||e.mozMovementX||e.webkitMovementX||0;Ie=(e.movementY||e.mozMovementY||e.webkitMovementY||0)*d.mouseSensitivity,Be=t*d.mouseSensitivity}function yi(){if(!s.firstPersonModeActive)return!1;let e=!1;return(Ie!==0||Be!==0)&&(V.setFromQuaternion($.quaternion),V.x-=Ie,V.y-=Be,V.x=Math.max(-mt,Math.min(mt,V.x)),$.quaternion.setFromEuler(V),$.getWorldDirection(ot),So(Math.atan2(ot.x,-ot.z)),Ie=0,Be=0,e=!0),e}Math.random=d.randomSeed?rt(d.randomSeed):rt();s.errorTexture=an();s.errorMesh=ln();const w=Object.freeze({init:0,fadeIn:1,play:2,fadeOut:3,pause:4,idle:5});let nt=1,_=w.init,ko=0;const{promise:mi,resolve:xi}=Promise.withResolvers();document.addEventListener("DOMContentLoaded",()=>{ko=on(),lt("Loading..."),cn([ni,Kn,Tn,Dn],xi)});await mi;wi();function wi(){gn(),ii(window.innerWidth,window.innerHeight-ko),mn(),li(),gi(),uo(),oo(),mo(po),Jt(),requestAnimationFrame(Do)}function Do(){let e=!0;switch(_){case w.init:{nn(nt);const t=Math.random().toString().substring(2),o=5+nt*2,n=fn(o,o,t);fo(n),no(n),Mo(n),fi(),_=w.fadeIn}break;case w.fadeIn:ri()&&(_=w.play);break;case w.play:e=ht(),e|=yi(),e|=io(),e|=go(),Et().type==="O"&&(nt++,s.mazeExited=!0,_=w.fadeOut,eo("mazeExit"));break;case w.fadeOut:ht(),si()&&(_=w.pause);break;case w.pause:setTimeout(()=>{_=w.init},800),_=w.idle;break;case w.idle:break;default:console.log("game_loop(): Unknown game state: "+_),_=w.pause;break}e|=ci(),yn(),Ct(e),requestAnimationFrame(Do)}
