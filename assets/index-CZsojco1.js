import{D as At,S as Ne,M as Ct,a as Me,L as zt,b as et,T as tt,c as De,d as Tt,P as ge,e as _t,f as Rt,W as Ft,g as Ht,C as He,h as It,F as $t,O as Gt,A as Wt,V as Ot,E as Ut,i as Yt,j as Bt,k as Xt,G as Kt,R as Vt,l as Zt,m as nt,B as jt,I as qt}from"./three-BthQXnPf.js";import{W as Qt,V as te,C as Jt,B as ke}from"./planck-D8CQOpC-.js";import{N as K,G as Nt}from"./keystrokes-zXtNIVHG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function Ee(...e){let t,n,r,i;if(e.length===0){const a=new Uint32Array(3);window.crypto.getRandomValues(a),e=[a[0],a[1],a[2]]}s(e);function s(a){const d=l();t=d(" "),n=d(" "),r=d(" "),i=1;for(let p=0;p<a.length;p++)t-=d(a[p]),t<0&&(t+=1),n-=d(a[p]),n<0&&(n+=1),r-=d(a[p]),r<0&&(r+=1)}function l(){let a=4022871197;function d(p){p=p.toString();const E=p.length;for(let L=0;L<E;L++){a+=p.charCodeAt(L);let x=.02519603282416938*a;a=x>>>0,x-=a,x*=a,a=x>>>0,x-=a,a+=x*4294967296}return(a>>>0)*23283064365386963e-26}return d}function f(a){return parseInt(a,10)===a}function u(){const a=2091639*t+i*23283064365386963e-26;return t=n,n=r,r=a-(i=a|0),r}return u.fract53=function(){return u()+(u()*2097152|0)*11102230246251565e-32},u.int32=function(){return u()*4294967296},u.cycle=function(a){a=typeof a>"u"?1:Number(a),a<1&&(a=1);for(let d=0;d<a;d++)u()},u.range=function(a=0,d=0){if(a===0&&d===0)return 0;if(a>d){const p=a;a=d,d=p}return f(a)&&f(d)?Math.floor(u()*(d-a+1))+a:u()*(d-a)+a},u.restart=function(){s(e)},u.seed=function(...a){s(a)},u}const en={_MODULE:"global.js",cameraYpos:0,idleStartMs:0,firstPersonModeActive:!1,mazeExited:!1,orbitControlsEnabled:!1,idleMode:!1,camera:null,exitLight:null,fog:null,physicsWorld:null,playerLight:null,renderer:null,renderUpdate:()=>{console.warn("global.renderUpdate not set")},scene:null,errorTexture:null,errorMesh:null,statusBar:null},tn={get(e,t){if(t in e)return e[t];throw console.error('Cannot read non existent property "'+t+'" from global'),new Error},set(e,t,n){if(t in e)return e[t]=n,!0;throw console.error('Cannot create new property "'+t+'" on global'),new Error},deleteProperty(e,t){throw console.error('Cannot delete property "'+t+'" from global'),new Error}},o=new Proxy(Object.seal(en),tn),nn={_MODULE:"config.js",ballRadius:.3,bgColour:1048576,playerLightLevel:.9,textureDir:"./textures/128/",randomSeed:0,soundsDir:"./sounds/",modelDir:"./models/",keyModelFile:"Key.glb",baseModelFile:"TeleporterBase.glb",doorModelFile:"ArchDoor.glb",keySounds:{keyPickup:{filename:"DM-CGS-07.ogg",volume:.4}},keySoundGroups:{},ballTextureFile:"Tile1.png",minVelocity:.1,exitLightY:.4,floorTextureFiles:["Tile8.png","Tile16.png","Tile24.png","Tile25.png"],mazeHeight:1.2,wallTextureFiles:["Tile11.png","Tile4.png","Tile18.png","Tile20.png","Tile21.png","Tile23.png"],mazeSounds:{locked:{filename:"DM-CGS-10.ogg",volume:.3},dm12:{filename:"DM-CGS-12.ogg",volume:.25},dm26:{filename:"DM-CGS-26.ogg",volume:.4},wallhit:{filename:"DM-CGS-03.ogg",volume:.05}},mazeSoundGroups:{mazeExit:["dm12","dm26"]},controlKeys:{up:["ArrowUp","w","k"],down:["ArrowDown","s","j"],left:["ArrowLeft","a","h"],right:["ArrowRight","d","l"]},keys:{orbit_controls:"control>enter",house_lights:"shift>enter",first_person:"+"},mouseSensitivity:.005,idleTimeout:15,keyForce:.4,lightYpos:1.4,cameraEase:.08,cameraExitEase:.04,defaultCameraY:4,enableShadows:!0,exitLightLevel:.5,sunLightLevel:.4},on={get(e,t){if(t in e)return e[t];throw console.error('Cannot read non existent property "'+t+'" from config'),new Error},set(e,t){throw console.error('Cannot write to property "'+t+'" on config'),new Error},deleteProperty(e,t){throw console.error('Cannot delete property "'+t+'" from config'),new Error}},c=new Proxy(Object.freeze(nn),on);let z=null,Ke=0,Ae=0,Ie=0,Ce=0,le=0,Ve=0;function rn(){return z=document.createElement("div"),z.id="statusBar",z.classList.add("status"),document.body.append(z),Ke=z===null?0:z.clientHeight,Ke}function ze(...e){z&&(z.innerHTML=e.join(" "))}function sn(e){e!==Ae&&(Ae=e,Ie=0,Ce=0,$e())}function an(){Ie++,$e()}function ln(e){Ce+=e,le=Math.round(Ce),le!==Ve&&(Ve=le,$e())}function $e(){z.innerHTML="Level: "+Ae+" &nbsp; Distance Rolled: "+le+" &nbsp; Wall Impacts: "+Ie}function cn(){const n=new Uint8Array(1024);for(let i=0;i<1024;i+=4)n[i]=255,n[i+1]=105,n[i+2]=180,n[i+3]=255;const r=new At(n,16,16);return r.needsUpdate=!0,r}function dn(){const e=new Ne(.1),t=new Ct({color:16738740});return new Me(e,t)}function fn(e,t){let n=!1,r=!1;const i=new zt;i.onError=s=>{console.warn("Failed to load asset:",s),r=!0},i.onProgress=function(s,l,f){ze("Loaded",Math.floor(l/f*100)+"%")},i.onLoad=()=>{n&&(r&&console.error("LoadingManager: finished loading asset files with errors"),ze(""),t())},e.forEach(s=>{typeof s.loadAssets=="function"?s.loadAssets(i):console.warn(s,"has no loadAssets method")}),n=!0}const un=Math.PI/2,I=Ee();function pn(e,t,n){const r=e<3?3:e|1,i=t<3?3:t|1,s={x:r,z:i},l=n===void 0?Math.random().toString().substring(2):n;I.seed(l);const f={size:s,data:Array.from({length:s.x},()=>Array(s.z).fill(!1)),deadends:[],seed:l},u=hn(s);return f.start=u.start,f.start.angle=0,f.end=u.end,f.exit=u.exit,f.data[f.exit.x][f.exit.z]="H",f}function gn(e,t,n){const r=pn(e,t,n);ot(r,r.start.x,r.start.z);const{x:i,z:s}=r.start;let l=0;return r.data[i-1][s]!==!1?l=1:r.data[i][s+1]!==!1?l=2:r.data[i+1][s]!==!1&&(l=3),r.data[r.start.x][r.start.z]="S",r.data[r.end.x][r.end.z]="E",r.start.angle=l*un,r}function ot(e,t,n){let r=t===e.end.x&&n===e.end.z;for(;;){const i=[];let s;if(n<e.size.z-3&&e.data[t][n+2]===!1&&i.push([0,1]),t<e.size.x-3&&e.data[t+2][n]===!1&&i.push([1,0]),n>2&&e.data[t][n-2]===!1&&i.push([0,-1]),t>2&&e.data[t-2][n]===!1&&i.push([-1,0]),i.length===0)return r?e.data[t][n]="*":e.data[t][n]===!1&&(e.data[t][n]="D",e.deadends.push({x:t,z:n})),r;if(e.data[t][n]="",i.length===1?[s]=i:s=i[Math.floor(I()*i.length)],ot(e,t+s[0]*2,n+s[1]*2)?(e.data[t+s[0]][n+s[1]]="*",r=!0):e.data[t+s[0]][n+s[1]]="",i.length===1)return r&&(e.data[t][n]="*"),r}}function hn(e){const t={},n={};let r=I()>.5,i=I()>.5;t.x=i?1:e.x-2,t.z=r?1:e.z-2;const s=I();s>.5?(r=!r,i=!i):s>.25?r=!r:i=!i,n.x=i?1:e.x-2;const l=i?-1:1;n.z=r?1:e.z-2;const f=r?-1:1,u={...n};return I()>.5?(n.z+=f,n.dir=r?"U":"D"):(n.x+=l,n.dir=i?"L":"R"),{start:t,end:u,exit:n}}let j;const w={};function yn(){j=new Qt({gravity:new te(0,0)}),o.physicsWorld=j,o.physicsWorld.addContactCallback=mn,j.on("begin-contact",e=>{const t=e.m_nodeA.other.m_userData,n=e.m_nodeB.other.m_userData;if(t===void 0||n===void 0||!w[t]||!w[t][n])return;const r=w[t][n],i=performance.now();if(!(i-r.last<250)){if(r.last=i,typeof r.callback=="function"){r.callback(e);return}r.callback.forEach(s=>{s(e)})}})}function mn(e,t,n){if(w[e]||(w[e]={}),!w[e][t]){w[e][t]={},w[e][t].last=0,w[e][t].callback=n;return}if(typeof w[e][t].callback=="function"){const r=w[e][t].callback;w[e][t].callback=[r]}w[e][t].callback.push(n)}function xn(){j.step(1/60),j.clearForces()}let $=0,G=0;function wn(){function e(){G+=1}function t(){G-=1}function n(){$-=1}function r(){$+=1}K(c.controlKeys.up,{onPressed:t,onReleased:e}),K(c.controlKeys.down,{onPressed:e,onReleased:t}),K(c.controlKeys.left,{onPressed:n,onReleased:r}),K(c.controlKeys.right,{onPressed:r,onReleased:n})}function Mn(e){addEventListener("pointermove",e,!1)}function bn(e){removeEventListener("pointermove",e)}function Te(e,t){if(!c.keys[e]){console.error("Unknown key index: "+e);return}const n=c.keys[e];n.includes(">")?Nt(n,t):K(n,t)}const Ze=new te(0,0),se=new et,_=c.ballRadius,je=c.minVelocity;let M,Y,ce,rt=()=>{console.warn("gUpdateMazePosition not set")};function Ln(e){new tt(e).load(c.textureDir+"ball/"+c.ballTextureFile,n=>{ce=n,ce.colorSpace=De},void 0,()=>{ce=o.errorTexture})}function vn(e){typeof e=="function"&&(rt=e),Y=o.physicsWorld.createBody({type:"dynamic",position:Ze,awake:!1,fixedRotation:!0,userData:"ball"}),Y.createFixture({shape:new Jt(Ze,_),restitution:.15,density:.2});const t=new Ne(_),n=new Tt({map:ce});return M=new Me(t,n),M.position.y=_,M.castShadow=!0,o.scene.add(M),[Y,M]}function Pn(){if(Y.isAwake()){const i=Y.getLinearVelocity();i.mul(.98),Math.abs(i.x)<je&&Math.abs(i.y)<je&&(i.x=0,i.y=0)}const e=Y.getPosition(),t=e.y,n=e.x-M.position.x,r=t-M.position.z;if(n!==0||r!==0){M.position.set(e.x,_,t);const i=Math.sqrt(n*n+r*r);return rt(e.x,_,t,i),o.firstPersonModeActive||(se.makeRotationZ(-n/_),M.matrix.premultiply(se),se.makeRotationX(r/_),M.matrix.premultiply(se),M.rotation.setFromRotationMatrix(M.matrix)),!0}return!1}function Sn(){return _}function Dn(e){M.visible=!e}let ne,be,W,oe=0,it=()=>{console.warn("gUpdateMazePosition not set")};const kn=new te(0,0),st=Math.PI/4,En=Math.sin(st),An=Math.cos(st);function Cn(e){Ln(e)}function at(e){typeof e=="function"&&(it=e),[be,ne]=vn(e),W=new ge(16769248,c.playerLightLevel),W.castShadow=!1,o.scene.add(W),o.playerLight=W}function _e(){if($!==0||G!==0){let t;if($!==0&&G!==0?t=new te($*An,G*En):t=new te($,G),t.mul(c.keyForce),o.firstPersonModeActive){const n=Math.cos(oe),r=Math.sin(oe),i=n*t.x-r*t.y,s=r*t.x+n*t.y;t.x=i,t.y=s}_n(t)}o.playerLight.position.x=ne.position.x,o.playerLight.position.z=ne.position.z;const e=Pn();return e&&(o.idleStartMs=0,o.idleMode=!1),!e&&!o.idleMode&&(o.idleStartMs===0?o.idleStartMs=Date.now():Date.now()-o.idleStartMs>c.idleTimeout*1e3&&(o.idleMode=!0)),e}function zn(e){be.setLinearVelocity(e)}function lt(e){zn(kn),Tn(e.start.x,e.start.z),oe=-e.start.angle,W.position.set(e.start.x,c.lightYpos,e.start.z),W.intensity=0}function Tn(e,t){const n=Le();ne.position.set(e,n.y,t),be.setPosition({x:e,y:t}),it(e,n.y,t,0)}function Le(){return ne.position}function ct(){return Sn()}function _n(e){be.applyForceToCenter(e)}function dt(){return oe}function ft(e){oe=e}function Re(e){Dn(e)}const Rn="player.js",Fn=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:Rn,getAngle:dt,getCameraHeight:ct,getPosition:Le,hideMesh:Re,loadAssets:Cn,setAngle:ft,setNewMaze:lt,setup:at,update:_e},Symbol.toStringTag,{value:"Module"}));let h;function Hn(e,t,n=document.body){o.renderUpdate=Ge,o.cameraYpos=c.defaultCameraY,o.scene=new _t,o.camera=new Rt(80,window.innerWidth/window.innerHeight),o.renderer=new Ft({antialias:!0}),o.renderer.shadowMap.enabled=c.enableShadows,o.renderer.shadowMap.type=Ht,n.appendChild(o.renderer.domElement),o.renderer.setPixelRatio(window.devicePixelRatio),o.renderer.setSize(e,t),window.addEventListener("resize",Gn),o.scene.background=new He(c.bgColour),h=new It(16777215,c.sunLightLevel),h.castShadow=!0,h.position.set(5,20,5),h.shadow.camera.left=-10,h.shadow.camera.right=10,h.shadow.camera.top=0,h.shadow.camera.bottom=-20,h.shadow.camera.near=10,h.shadow.camera.far=25,o.scene.add(h),o.fog=new $t(c.bgColour,5,10),o.scene.fog=o.fog}function Ge(e=!0){let t=!1;if(!o.orbitControlsEnabled){const n=Le();if(o.firstPersonModeActive)o.camera.position.x=n.x,o.camera.position.z=n.z;else{const r=n.x-o.camera.position.x,i=n.z-o.camera.position.z;if(r!==0||i!==0){t=!0;const s=o.mazeExited?c.cameraExitEase:c.cameraEase;s>=1||Math.abs(r)<.008&&Math.abs(i)<.008?(o.camera.position.x=n.x,o.camera.position.z=n.z):(o.camera.position.x+=r*s,o.camera.position.z+=i*s)}}}(e||t)&&o.renderer.render(o.scene,o.camera)}function In(){const e=.1*(c.playerLightLevel-o.playerLight.intensity),t=.1*(c.sunLightLevel-h.intensity);return o.playerLight.intensity+=e,h.intensity+=t,e<.01?(o.playerLight.intensity=c.playerLightLevel,o.exitLight.intensity=c.exitLightLevel,h.intensity=c.sunLightLevel,!0):!1}function $n(){const e=.04*o.playerLight.intensity;return o.playerLight.intensity-=e,o.exitLight.intensity-=e,h.intensity-=e/2,e<.01?(o.playerLight.intensity=0,o.exitLight.intensity=0,h.intensity=0,!0):!1}function Gn(){o.camera.aspect=window.innerWidth/window.innerHeight,o.camera.updateProjectionMatrix(),o.renderer.setSize(window.innerWidth,window.innerHeight),Ge()}var q=function(){var e=0,t=document.createElement("div");t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",function(d){d.preventDefault(),r(++e%t.children.length)},!1);function n(d){return t.appendChild(d.dom),d}function r(d){for(var p=0;p<t.children.length;p++)t.children[p].style.display=p===d?"block":"none";e=d}var i=(performance||Date).now(),s=i,l=0,f=n(new q.Panel("FPS","#0ff","#002")),u=n(new q.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var a=n(new q.Panel("MB","#f08","#201"));return r(0),{REVISION:16,dom:t,addPanel:n,showPanel:r,begin:function(){i=(performance||Date).now()},end:function(){l++;var d=(performance||Date).now();if(u.update(d-i,200),d>=s+1e3&&(f.update(l*1e3/(d-s),100),s=d,l=0,a)){var p=performance.memory;a.update(p.usedJSHeapSize/1048576,p.jsHeapSizeLimit/1048576)}return d},update:function(){i=this.end()},domElement:t,setMode:r}};q.Panel=function(e,t,n){var r=1/0,i=0,s=Math.round,l=s(window.devicePixelRatio||1),f=80*l,u=48*l,a=3*l,d=2*l,p=3*l,E=15*l,L=74*l,x=30*l,F=document.createElement("canvas");F.width=f,F.height=u,F.style.cssText="width:80px;height:48px";var g=F.getContext("2d");return g.font="bold "+9*l+"px Helvetica,Arial,sans-serif",g.textBaseline="top",g.fillStyle=n,g.fillRect(0,0,f,u),g.fillStyle=t,g.fillText(e,a,d),g.fillRect(p,E,L,x),g.fillStyle=n,g.globalAlpha=.9,g.fillRect(p,E,L,x),{dom:F,update:function(ie,Et){r=Math.min(r,ie),i=Math.max(i,ie),g.fillStyle=n,g.globalAlpha=1,g.fillRect(0,0,f,E),g.fillStyle=t,g.fillText(s(ie)+" "+e+" ("+s(r)+"-"+s(i)+")",a,d),g.drawImage(F,p+l,E,L-l,x,p,E,L-l,x),g.fillRect(p+L-l,E,l,x),g.fillStyle=n,g.globalAlpha=.9,g.fillRect(p+L-l,E,l,s((1-ie/Et)*x))}}};let ve=!1,S,Q,qe,he;function Wn(){he=new q,document.body.appendChild(he.dom),Te("orbit_controls",Un),Te("house_lights",Yn),S=new Gt(o.camera,o.renderer.domElement),S.enableDamping=!0,S.enabled=!1,S.minPolarAngle=.02,S.maxPolarAngle=Math.PI-.05,Q=new Wt(13421772,1),Q.intensity=0,o.scene.add(Q)}function On(){return he&&he.update(),o.orbitControlsEnabled?(S.update(),!0):!1}function Un(){if(o.firstPersonModeActive){console.log("Cannot activate orbit controls while in first person view");return}o.orbitControlsEnabled=!o.orbitControlsEnabled;const e=Le();o.orbitControlsEnabled?(console.log("Orbit controls enabled"),qe=o.camera.position.y,S.target.set(e.x,e.y,e.z)):(console.log("Orbit controls disabled"),o.camera.position.x=e.x,o.camera.position.y=qe,o.camera.position.z=e.z,o.camera.rotation.set(3*Math.PI/2,0,0),o.renderUpdate()),S.enabled=o.orbitControlsEnabled}function Yn(){ve=!ve,ve?(Q.intensity=1,o.scene.fog=null,console.log("House lights up")):(Q.intensity=0,o.scene.fog=o.fog,console.log("House lights down")),o.renderUpdate()}function Bn(){S&&S.target.set(o.camera.position.x,c.ballRadius,o.camera.position.z)}const H=new Ut(0,0,0,"YZX"),Pe=new Ot,Xn="pointerLockElement"in document;let de=0,fe=0;const Fe=Math.PI/2;function Kn(){if(!Xn){console.log("browser does not support pointer lock, no first person view available");return}Te("first_person",Vn),addEventListener("pointerlockchange",()=>{if(o.orbitControlsEnabled){document.pointerLockElement&&(console.log("Cannot switch to first person view while orbit controls are active"),document.exitPointerLock());return}o.firstPersonModeActive?(document.exitPointerLock(),o.camera.rotation.set(-Fe,0,0),o.camera.position.y=o.cameraYpos=c.defaultCameraY,bn(Qe),Re(!1),o.firstPersonModeActive=!1,console.log("first person view disabled")):(o.camera.rotation.set(0,-dt(),0),o.camera.position.y=o.cameraYpos=ct(),Mn(Qe),Re(!0),o.firstPersonModeActive=!0,console.log("first person view enabled")),o.renderUpdate()})}function Vn(){o.firstPersonModeActive?document.exitPointerLock():o.renderer.domElement.requestPointerLock()}function Qe(e){const t=e.movementX||e.mozMovementX||e.webkitMovementX||0;de=(e.movementY||e.mozMovementY||e.webkitMovementY||0)*c.mouseSensitivity,fe=t*c.mouseSensitivity}function Zn(){if(!o.firstPersonModeActive)return!1;let e=!1;return(de!==0||fe!==0)&&(H.setFromQuaternion(o.camera.quaternion),H.x-=de,H.y-=fe,H.x=Math.max(-Fe,Math.min(Fe,H.x)),o.camera.quaternion.setFromEuler(H),o.camera.getWorldDirection(Pe),ft(Math.atan2(Pe.x,-Pe.z)),de=0,fe=0,e=!0),e}const V={},T={},R={},Z={};let J=null,ye=!1,ut=!1;function jn(e){const t=new Yt(e);t.setResponseType("arraybuffer");for(const n in R)Object.hasOwn(R,n)&&t.load(c.soundsDir+R[n].filename,r=>{V[n]=r.transfer()})}function We(e){for(const t in e)if(Object.hasOwn(e,t)){const n=e[t];typeof n=="string"?R[t]={filename:n,volume:1}:typeof n=="object"&&n.filename&&(R[t]={filename:n.filename},R[t].volume=n.volume?n.volume:1)}}function Oe(e){for(const t in e)Object.hasOwn(e,t)&&(Z[t]=e[t])}function pt(){document.body.addEventListener("click",()=>{ye||ht()},{once:!0}),ut=/firefox/i.test(navigator.userAgent),document.body.addEventListener("keydown",gt,{once:!0})}function gt(e){if(ut&&e.key.length>1){ye||document.body.addEventListener("keydown",gt,{once:!0});return}ye||ht()}function ht(){J=new Bt,o.camera.add(J);const e=new AudioContext;for(const t in V)Object.hasOwn(V,t)&&(T[t]||(T[t]=new Xt(J),e.decodeAudioData(V[t],n=>{T[t].setBuffer(n),T[t].setLoop(!1),T[t].setVolume(R[t].volume),delete V[t]})));ye=!0}function re(e){return J===null?!0:T[e]?(T[e].isPlaying&&T[e].stop(),T[e].play(),!0):!1}function yt(e){if(J===null)return!0;if(Z[e]){const t=Z[e].length;if(t>0){const n=Math.floor(Math.random()*t),r=Z[e][n];return re(r)?!0:(Z[e].splice(n,1),!1)}else return!1}return!1}const qn="sounds.js",Qn=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:qn,addAssets:We,addGroups:Oe,loadAssets:jn,play:re,playFromGroup:yt,setup:pt},Symbol.toStringTag,{value:"Module"})),mt=Math.PI/2,Jn=new He(16711680),Nn=new He(65280);let P,Ue,k,B,X,N,b,D=null,Ye,Be,ue,Xe=!1,me=!1;function xt(){P=o.scene,Ue=o.exitLight,N=new ge(16766720,0),P.add(N),B=new ge(16766720,0),P.add(B),Ye=new ke(.5,.04),Be=new ke(.04,.5),o.physicsWorld.addContactCallback("ball","closed_door",()=>{re("locked")}),Xe=!0}function eo(e){const t=new Kt(e);t.load(c.modelDir+c.keyModelFile,n=>{k=n.scene,k.traverse(r=>{r instanceof Me&&(r.material.emissive={b:0,r:1,g:.7,isColor:!0},r.material.emissiveIntensity=.55)}),k.scale.set(.6,.6,.6)},void 0,()=>{k=o.errorMesh.clone()}),t.load(c.modelDir+c.baseModelFile,n=>{X=n.scene,X.scale.set(.35,.1,.35)},void 0,()=>{X=o.errorMesh.clone()}),t.load(c.modelDir+c.doorModelFile,n=>{b=n.scene,b.scale.set(.42,.4,.3)},void 0,()=>{b=o.errorMesh.clone()}),We(c.keySounds),Oe(c.keySoundGroups)}function wt(e){if(!Xe)return;D!==null&&(o.physicsWorld.destroyBody(D),D=null),P.remove(k),P.remove(X),P.remove(b),N.intensity=0,B.intensity=0,me=!1;const t=e;if(ue=t,t.deadends.length===0){t.key=!1,t.keyIndex=!1;return}const n=Math.floor(Math.random()*t.deadends.length);t.key=t.deadends[n],t.keyIndex=n,t.data[t.key.x][t.key.z]="K";const{x:r,z:i}=t.exit;t.data[r][i]="L";let s=t.exit.x,l=t.exit.z,f;t.exit.dir==="L"||t.exit.dir==="R"?(b.rotation.set(0,mt,0),s+=t.exit.dir==="R"?.5:-.5,f=Be):(b.rotation.set(0,0,0),l+=t.exit.dir==="D"?.5:-.5,f=Ye);const u={type:"static",position:{x:s,y:l},userData:"closed_door"};D=o.physicsWorld.createBody(u),D.createFixture({shape:f}),X.position.set(t.key.x,0,t.key.z),P.add(X),N.position.set(t.key.x,.1,t.key.z),N.intensity=.04,k.position.set(t.key.x,.38,t.key.z),P.add(k),B.position.set(t.key.x,.44,t.key.z),B.intensity=.1,me=!0,b.position.set(s,0,l),P.add(b),Ue.color=Jn}function Mt(){return!Xe||!me||o.idleMode?!1:(k.rotateY(.03),k.rotateZ(.03),!0)}function bt(){P.remove(k),B.intensity=0,me=!1,re("keyPickup");const{x:e,z:t}=ue.exit;ue.data[e][t]="H",D!==null&&(o.physicsWorld.destroyBody(D),D=null);const n=ue.exit.dir;let r=b.position.x,i=b.position.z,s,l=0;n==="L"||n==="R"?(r+=n==="R"?.5:-.5,i+=.5,s=Ye):(l=mt,r+=.5,i+=n==="D"?.5:-.5,s=Be);const f={type:"static",position:{x:r,y:i},userData:"open_door"};D=o.physicsWorld.createBody(f),D.createFixture({shape:s}),b.position.set(r,0,i),b.rotation.set(0,l,0),Ue.color=Nn}const to="key.js",no=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:to,collect:bt,create:wt,loadAssets:eo,setup:xt,update:Mt},Symbol.toStringTag,{value:"Module"})),Je=Math.PI/2,xe=[],we=[],ae=[],y={x:0,z:0,type:""};let O,pe,ee,A,v,U;function Lt(){O=o.scene,pe=o.camera,ee=new ge(65280,0),O.add(ee),o.exitLight=ee,U={size:{x:0,z:0}},o.physicsWorld.addContactCallback("ball","wall",e=>{const t=e.getManifold().localNormal,n=e.getFixtureB().getBody().getLinearVelocity(),r=Math.abs(n.x*t.x),i=Math.abs(n.y*t.y);(r>.9||i>.9)&&(re("wallhit"),an())})}function oo(e){const t=new tt(e);for(const n of c.wallTextureFiles)t.load(c.textureDir+"walls/"+n,r=>{r.colorSpace=De,xe.push(r)},void 0,()=>{xe.push(o.errorTexture)});for(const n of c.floorTextureFiles)t.load(c.textureDir+"floors/"+n,r=>{r.colorSpace=De,we.push(r)},void 0,()=>{we.push(o.errorTexture)});We(c.mazeSounds),Oe(c.mazeSoundGroups)}function vt(e){U=e,ae.length>0&&(ae.forEach(a=>o.physicsWorld.destroyBody(a)),ae.length=0);const t={type:"static",position:{x:0,y:0},userData:"wall"},n=new ke(.5,.5);for(let a=0;a<e.size.x;a++)for(let d=0;d<e.size.z;d++)if(e.data[a][d]===!1){t.position={x:a,y:d};const p=o.physicsWorld.createBody(t);ae.push(p),p.createFixture({shape:n})}const r=e.size.x,i=e.size.z;A&&(O.remove(A),A.geometry.dispose(),A.material.dispose(),A=null),v&&(O.remove(v),v.geometry.dispose(),v.material.dispose(),v=null),A=ro(e),A.castShadow=!0,A.receiveShadow=!0,O.add(A);const s=Math.floor(Math.random()*we.length),l=we[s];l.wrapS=l.wrapT=Vt,l.repeat.set(r+15,i+15);const f=new Zt(r+15,i+15),u=new nt({map:l});v=new Me(f,u),v.rotateX(-Je),v.position.set((r-1)/2,0,(i-1)/2),v.receiveShadow=!0,O.add(v),o.firstPersonModeActive?pe.rotation.set(0,e.start.angle,0):pe.rotation.set(-Je,0,0),pe.position.set(e.start.x,o.cameraYpos,e.start.z),ee.position.set(e.exit.x,c.exitLightY,e.exit.z),ee.intensity=0,o.mazeExited=!1}function ro(e){const t=new jt(1,c.mazeHeight,1),n=Math.floor(Math.random()*xe.length),r=xe[n],i=new nt({map:r}),s=new qt(t,i,e.size.x*e.size.z);s.count=0;const l=new et;for(let f=0;f<e.size.x;f++)for(let u=0;u<e.size.z;u++)e.data[f][u]===!1&&(l.setPosition(f,c.mazeHeight/2,u),s.setMatrixAt(s.count++,l));return s}function Pt(e,t,n,r){ln(r);const i=Math.floor(e+.5),s=Math.floor(n+.5),l=y.x,f=y.z;if(i===l&&s===f)return;const u=y.type;y.x=i,y.z=s,i>=0&&i<U.size.x&&s>=0&&s<U.size.z?y.type=U.data[y.x][y.z]:y.type="O",y.type!==u&&y.type==="K"&&(bt(),U.data[y.x][y.z]="D")}function St(){return y}const io="maze.js",so=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:io,create:vt,getPlayerGridInfo:St,loadAssets:oo,setup:Lt,updatePlayerPosition:Pt},Symbol.toStringTag,{value:"Module"}));Math.random=c.randomSeed?Ee(c.randomSeed):Ee();o.errorTexture=cn();o.errorMesh=dn();const m=Object.freeze({init:0,fadeIn:1,play:2,fadeOut:3,pause:4,idle:5});let Se=1,C=m.init,Dt=0;document.addEventListener("DOMContentLoaded",()=>{Dt=rn(),ze("Loading..."),fn([Fn,so,no,Qn],ao)});function ao(){yn(),Hn(window.innerWidth,window.innerHeight-Dt),wn(),Wn(),Kn(),Lt(),xt(),at(Pt),pt(),requestAnimationFrame(kt)}function kt(){let e=!0;switch(C){case m.init:{sn(Se);const t=Math.random().toString().substring(2),n=5+Se*2,r=gn(n,n,t);vt(r),wt(r),lt(r),Bn(),C=m.fadeIn}break;case m.fadeIn:In()&&(C=m.play);break;case m.play:e=_e(),e|=Zn(),e|=Mt(),St().type==="O"&&(Se++,o.mazeExited=!0,C=m.fadeOut,yt("mazeExit"));break;case m.fadeOut:_e(),$n()&&(C=m.pause);break;case m.pause:setTimeout(()=>{C=m.init},800),C=m.idle;break;case m.idle:break;default:console.log("game_loop(): Unknown game state: "+C),C=m.pause;break}e|=On(),xn(),Ge(e),requestAnimationFrame(kt)}
