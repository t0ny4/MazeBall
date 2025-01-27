import{N as $,G as Ze}from"./keystrokes-zXtNIVHG.js";import{W as Ve,V as W,C as Pe,B as qe}from"./planck-BHduNLkk.js";import{M as ve,T as ue,S as N,a as Ee,b as Ne,c as j,P as Q,d as Qe,e as Je,W as et,f as tt,C as pe,D as nt,F as ot,g as rt,h as Ae,G as it,R as Se,i as st,j as ke,B as at,I as lt,O as ct,A as dt,V as ft,E as ut,k as pt,L as gt}from"./three-D87jA344.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const f of l.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function o(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(r){if(r.ep)return;r.ep=!0;const l=o(r);fetch(r.href,l)}})();function he(){let e,t,o,i,r=Array.prototype.slice.call(arguments);if(r.length===0){const s=new Uint32Array(3);window.crypto.getRandomValues(s),r=[s[0],s[1],s[2]]}l(r);function l(s){const c=f();e=c(" "),t=c(" "),o=c(" "),i=1;for(let u=0;u<s.length;u++)e-=c(s[u]),e<0&&(e+=1),t-=c(s[u]),t<0&&(t+=1),o-=c(s[u]),o<0&&(o+=1)}function f(){let s=4022871197;var c=function(u){u=u.toString();const Xe=u.length;for(let ie=0;ie<Xe;ie++){s+=u.charCodeAt(ie);var E=.02519603282416938*s;s=E>>>0,E-=s,E*=s,s=E>>>0,E-=s,s+=E*4294967296}return(s>>>0)*23283064365386963e-26};return c}function h(s){return parseInt(s,10)===s}const d=function(){const s=2091639*e+i*23283064365386963e-26;return e=t,t=o,o=s-(i=s|0)};return d.fract53=function(){return d()+(d()*2097152|0)*11102230246251565e-32},d.int32=function(){return d()*4294967296},d.cycle=function(s){s=typeof s>"u"?1:+s,s<1&&(s=1);for(let c=0;c<s;c++)d()},d.range=function(s=0,c=0){if(s===0&&c===0)return 0;if(s>c){const u=s;s=c,c=u}return h(s)&&h(c)?Math.floor(d()*(c-s+1))+s:d()*(c-s)+s},d.restart=function(){l(r)},d.seed=function(){l(Array.prototype.slice.call(arguments))},d}const yt={_MODULE:"global.js",cameraYpos:0,firstPersonModeActive:!1,mazeExited:!1,orbitControlsEnabled:!1,camera:null,exitLight:null,fog:null,physicsWorld:null,playerLight:null,renderer:null,renderUpdate:()=>{},scene:null,errorTexture:null,errorMesh:null},ht={get(e,t){if(t in e)return e[t];throw new Error("Global has no property named "+t)}},n=new Proxy(Object.seal(yt),ht),mt={_MODULE:"config.js",ballRadius:.3,bgColour:1048576,playerLightLevel:.9,textureDir:"./textures/128/",randomSeed:0,barrierHeight:.5,barrierRadius:.15,modelDir:"./models/",barrierTextureFile:"Roof13.png",keyModelFile:"Key.glb",baseModelFile:"TeleporterBase.glb",ballTextureFile:"Tile1.png",minVelocity:.1,exitLightY:.4,floorTextureFiles:["Tile8.png","Tile16.png","Tile24.png","Tile25.png"],mazeHeight:1.2,wallTextureFiles:["Tile11.png","Tile4.png","Tile18.png","Tile20.png","Tile21.png","Tile23.png"],controlKeys:{up:["ArrowUp","w","k"],down:["ArrowDown","s","j"],left:["ArrowLeft","a","h"],right:["ArrowRight","d","l"]},keys:{orbit_controls:"control>enter",house_lights:"shift>enter",first_person:"+"},mouseSensitivity:.005,keyForce:.4,lightYpos:1.4,cameraEase:.08,cameraExitEase:.04,defaultCameraY:4,enableShadows:!0,exitLightLevel:.5,sunLightLevel:.4},xt={get(e,t){if(t in e)return e[t];throw new Error("Config has no property named "+t)},set(e,t){throw new Error("Config is read only, attempted to write to property named "+t)}},a=new Proxy(Object.freeze(mt),xt),wt=Math.PI/2;function Mt(e){const t=5+e*2,o=t,i={size:{x:t,z:o},data:Array.from({length:t},()=>Array(o).fill(!1)),deadends:[],key:!1};let r=Lt(i.size);return i.start=r.start,i.start.angle=0,i.end=r.end,i.exit=r.exit,i.data[i.exit.x][i.exit.z]="H",i}function bt(e){const t=Mt(e);Te(t,t.start.x,t.start.z);const o=t.start.x,i=t.start.z;let r=0;if(t.data[o-1][i]!==!1?r=1:t.data[o][i+1]!==!1?r=2:t.data[o+1][i]!==!1&&(r=3),t.data[t.start.x][t.start.z]="S",t.data[t.end.x][t.end.z]="E",t.start.angle=r*wt,t.deadends.length>0){const l=Math.floor(Math.random()*t.deadends.length);t.key=t.deadends[l],t.data[t.key.x][t.key.z]="K"}return t}function Te(e,t,o){let i=t===e.end.x&&o===e.end.z;for(;;){const r=[];let l;if(o<e.size.z-3&&e.data[t][o+2]===!1&&r.push([0,1]),t<e.size.x-3&&e.data[t+2][o]===!1&&r.push([1,0]),o>2&&e.data[t][o-2]===!1&&r.push([0,-1]),t>2&&e.data[t-2][o]===!1&&r.push([-1,0]),r.length==0)return i?e.data[t][o]="*":e.data[t][o]===!1&&(e.data[t][o]="D",e.deadends.push({x:t,z:o})),i;if(e.data[t][o]=".",r.length==1?l=r[0]:l=r[Math.floor(Math.random()*r.length)],Te(e,t+l[0]*2,o+l[1]*2)?(e.data[t+l[0]][o+l[1]]="*",i=!0):e.data[t+l[0]][o+l[1]]=".",r.length==1)return i&&(e.data[t][o]="*"),i}}function Lt(e){const t={},o={};let i=Math.random()>.5,r=Math.random()>.5;t.x=r?1:e.x-2,t.z=i?e.z-2:1;const l=Math.random();l>.5?(i=!i,r=!r):l>.25?i=!i:r=!r,o.x=r?1:e.x-2;const f=r?-1:1;o.z=i?e.z-2:1;const h=i?1:-1,d={...o};return Math.random()>.5?o.z+=h:o.x+=f,{start:t,end:d,exit:o}}let k=0,T=0;function Pt(){function e(){T+=1}function t(){T-=1}function o(){k-=1}function i(){k+=1}$(a.controlKeys.up,{onPressed:t,onReleased:e}),$(a.controlKeys.down,{onPressed:e,onReleased:t}),$(a.controlKeys.left,{onPressed:o,onReleased:i}),$(a.controlKeys.right,{onPressed:i,onReleased:o})}function vt(e){addEventListener("pointermove",e,!1)}function Et(e){removeEventListener("pointermove",e)}function le(e,t){if(!a.keys[e]){console.error("Unknown key index: "+e);return}const o=a.keys[e];o.includes(">")?Ze(o,t):$(o,t)}let J;function At(){J=new Ve({gravity:new W(0,0)}),n.physicsWorld=J}function St(){J.step(1/60),J.clearForces()}const me=new W(0,0),K=new ve,v=a.ballRadius,xe=a.minVelocity;let m,O,X,Ce=()=>{console.warn("gUpdateMazePosition not set")};function kt(e){new ue(e).load(a.textureDir+"ball/"+a.ballTextureFile,o=>{X=o,X.colorSpace=N},void 0,o=>{X=n.errorTexture})}function Tt(e){typeof e=="function"&&(Ce=e),O=n.physicsWorld.createBody({type:"dynamic",position:me,awake:!1,fixedRotation:!0}),O.createFixture({shape:new Pe(me,v),restitution:.15,density:.2});const t=new Ee(v),o=new Ne({map:X});return m=new j(t,o),m.position.y=v,m.castShadow=!0,n.scene.add(m),[O,m]}function Ct(){if(O.isAwake()){const r=O.getLinearVelocity();r.mul(.98),Math.abs(r.x)<xe&&Math.abs(r.y)<xe&&(r.x=0,r.y=0)}const e=O.getPosition(),t=e.y,o=e.x-m.position.x,i=t-m.position.z;return o!==0||i!==0?(m.position.set(e.x,v,t),Ce(e.x,v,t),n.firstPersonModeActive||(K.makeRotationZ(-o/v),m.matrix.premultiply(K),K.makeRotationX(i/v),m.matrix.premultiply(K),m.rotation.setFromRotationMatrix(m.matrix)),!0):!1}function zt(){return v}function Dt(e){m.visible=!e}let Y,oe,C,G=0,ze=()=>{console.warn("gUpdateMazePosition not set")};const Ft=new W(0,0),De=Math.PI/4,Ot=Math.sin(De),_t=Math.cos(De);function Rt(e){kt(e)}function Fe(e){typeof e=="function"&&(ze=e),[oe,Y]=Tt(e),C=new Q(16769248,a.playerLightLevel),C.castShadow=!1,n.scene.add(C),n.playerLight=C}function ce(){if(k!=0||T!=0){let e;if(k!=0&&T!=0?e=new W(k*_t,T*Ot):e=new W(k,T),e.mul(a.keyForce),n.firstPersonModeActive){const t=Math.cos(G),o=Math.sin(G),i=t*e.x-o*e.y,r=o*e.x+t*e.y;e.x=i,e.y=r}It(e)}return n.playerLight.position.x=Y.position.x,n.playerLight.position.z=Y.position.z,Ct()}function $t(e){oe.setLinearVelocity(e)}function Oe(e){$t(Ft),Ht(e.start.x,e.start.z),G=-e.start.angle,C.position.set(e.start.x,a.lightYpos,e.start.z),C.intensity=0}function Ht(e,t){const o=re();Y.position.set(e,o.y,t),oe.setPosition({x:e,y:t}),ze(e,o.y,t)}function re(){return Y.position}function _e(){return zt()}function It(e){oe.applyForceToCenter(e)}function Re(){return G}function $e(e){G=e}function de(e){Dt(e)}const Ut="player.js",Wt=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:Ut,getAngle:Re,getCameraHeight:_e,getPosition:re,hideMesh:de,loadAssets:Rt,setAngle:$e,setNewMaze:Oe,setup:Fe,update:ce},Symbol.toStringTag,{value:"Module"}));let p;function Yt(e=document.body){n.renderUpdate=ge,n.cameraYpos=a.defaultCameraY,n.scene=new Qe,n.camera=new Je(80,window.innerWidth/window.innerHeight),n.renderer=new et({antialias:!0}),n.renderer.shadowMap.enabled=a.enableShadows,n.renderer.shadowMap.type=tt,e.appendChild(n.renderer.domElement),n.renderer.setPixelRatio(window.devicePixelRatio),n.renderer.setSize(window.innerWidth,window.innerHeight),window.addEventListener("resize",Kt),n.scene.background=new pe(a.bgColour),p=new nt(16777215,a.sunLightLevel),p.castShadow=!0,p.position.set(5,20,5),p.shadow.camera.left=-10,p.shadow.camera.right=10,p.shadow.camera.top=0,p.shadow.camera.bottom=-20,p.shadow.camera.near=10,p.shadow.camera.far=25,n.scene.add(p),n.fog=new ot(a.bgColour,5,10),n.scene.fog=n.fog}function ge(e=!0){if(!n.orbitControlsEnabled){const t=re();if(n.firstPersonModeActive)n.camera.position.x=t.x,n.camera.position.z=t.z;else{const o=t.x-n.camera.position.x,i=t.z-n.camera.position.z;if(o!=0||i!=0){e=!0;const r=n.mazeExited?a.cameraExitEase:a.cameraEase;r>=1||Math.abs(o)<.008&&Math.abs(i)<.008?(n.camera.position.x=t.x,n.camera.position.z=t.z):(n.camera.position.x+=o*r,n.camera.position.z+=i*r)}}}e&&n.renderer.render(n.scene,n.camera)}function Gt(){const e=.1*(a.playerLightLevel-n.playerLight.intensity),t=.1*(a.sunLightLevel-p.intensity);return n.playerLight.intensity+=e,p.intensity+=t,e<.01?(n.playerLight.intensity=a.playerLightLevel,n.exitLight.intensity=a.exitLightLevel,p.intensity=a.sunLightLevel,!0):!1}function jt(){const e=.04*n.playerLight.intensity;return n.playerLight.intensity-=e,n.exitLight.intensity-=e,p.intensity-=e/2,e<.01?(n.playerLight.intensity=0,n.exitLight.intensity=0,p.intensity=0,!0):!1}function Kt(){n.camera.aspect=window.innerWidth/window.innerHeight,n.camera.updateProjectionMatrix(),n.renderer.setSize(window.innerWidth,window.innerHeight),ge()}const Bt=new rt(a.barrierRadius,a.barrierHeight),Xt=new pe(16711680),Zt=new pe(65280);let M,ye,z=null,ee,S,w,_,R,H,He=!1;function Ie(){M=n.scene,ye=n.exitLight,H=new Q(16766720,0),M.add(H),_=new Q(16766720,0),M.add(_);const e=new Ae({map:S});ee=new j(Bt,e),He=!0}function Vt(e){const t=new ue(e),o=new it(e);t.load(a.textureDir+"misc/"+a.barrierTextureFile,i=>{S=i,S.colorSpace=N,S.wrapS=S.wrapT=Se},void 0,()=>{S=n.errorTexture}),o.load(a.modelDir+a.keyModelFile,i=>{w=i.scene,w.traverse(r=>{r instanceof j&&(r.material.emissive={b:0,r:1,g:.7,isColor:!0},r.material.emissiveIntensity=.55)}),w.scale.set(.6,.6,.6),w.rotateZ(-.4),w.rotateY(.5)},void 0,()=>{w=n.errorMesh.clone()}),o.load(a.modelDir+a.baseModelFile,i=>{R=i.scene,R.scale.set(.35,.1,.35)},void 0,i=>{R=n.errorMesh.clone()})}function Ue(e){if(!He||(z!==null&&(n.physicsWorld.destroyBody(z),z=null),M.remove(w),M.remove(R),H.intensity=0,_.intensity=0,e.key===!1))return;const t=new Pe(a.barrierRadius),o={type:"static",position:{x:e.exit.x,y:e.exit.z}},i=n.physicsWorld.createBody(o);z=i,i.createFixture({shape:t}),R.position.set(e.key.x,0,e.key.z),M.add(R),H.position.set(e.key.x,.1,e.key.z),H.intensity=.04,w.position.set(e.key.x,.3,e.key.z),M.add(w),_.position.set(e.key.x,.3,e.key.z),_.intensity=.1,ee.position.set(e.exit.x,a.barrierHeight/2,e.exit.z),M.add(ee),ye.color=Xt}function We(){M.remove(w),_.intensity=0,z!==null&&n.physicsWorld.destroyBody(z),ye.color=Zt,M.remove(ee)}const qt="key.js",Nt=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:qt,collect:We,create:Ue,loadAssets:Vt,setup:Ie},Symbol.toStringTag,{value:"Module"})),we=Math.PI/2,te=[],ne=[],B=[],g={x:0,z:0,type:""};let D,Z,I,L,x,F;function Ye(){D=n.scene,Z=n.camera,I=new Q(65280,0),D.add(I),n.exitLight=I,F={size:{x:0,z:0}}}function Qt(e){const t=new ue(e);for(const o of a.wallTextureFiles)t.load(a.textureDir+"walls/"+o,i=>{i.colorSpace=N,te.push(i)},void 0,()=>{te.push(n.errorTexture)});for(const o of a.floorTextureFiles)t.load(a.textureDir+"floors/"+o,i=>{i.colorSpace=N,ne.push(i)},void 0,()=>{ne.push(n.errorTexture)})}function Ge(e){F=e,B.length>0&&(B.forEach(s=>n.physicsWorld.destroyBody(s)),B.length=0);const t={type:"static",position:{x:0,y:0}},o=new qe(.5,.5);for(let s=0;s<e.size.x;s++)for(let c=0;c<e.size.z;c++)if(e.data[s][c]===!1){t.position={x:s,y:c};const u=n.physicsWorld.createBody(t);B.push(u),u.createFixture({shape:o})}const i=e.size.x,r=e.size.z;L&&(D.remove(L),L.geometry.dispose(),L.material.dispose(),L=null),x&&(D.remove(x),x.geometry.dispose(),x.material.dispose(),x=null),L=Jt(e),L.castShadow=!0,L.receiveShadow=!0,D.add(L);const l=Math.floor(Math.random()*ne.length),f=ne[l];f.wrapS=f.wrapT=Se,f.repeat.set(i+15,r+15);const h=new st(i+15,r+15),d=new ke({map:f});x=new j(h,d),x.rotateX(-we),x.position.set((i-1)/2,0,(r-1)/2),x.receiveShadow=!0,D.add(x),n.firstPersonModeActive?Z.rotation.set(0,e.start.angle,0):Z.rotation.set(-we,0,0),Z.position.set(e.start.x,n.cameraYpos,e.start.z),I.position.set(e.exit.x,a.exitLightY,e.exit.z),I.intensity=0,n.mazeExited=!1}function Jt(e){const t=new at(1,a.mazeHeight,1),o=Math.floor(Math.random()*te.length),i=te[o],r=new ke({map:i}),l=new lt(t,r,e.size.x*e.size.z);l.count=0;const f=new ve;for(let h=0;h<e.size.x;h++)for(let d=0;d<e.size.z;d++)e.data[h][d]===!1&&(f.setPosition(h,a.mazeHeight/2,d),l.setMatrixAt(l.count++,f));return l}function je(e,t,o){const i=Math.floor(e+.5),r=Math.floor(o+.5),l=g.x,f=g.z;if(i===l&&r===f)return;const h=g.type;g.x=i,g.z=r,i>=0&&i<F.size.x&&r>=0&&r<F.size.z?g.type=F.data[g.x][g.z]:g.type="O",g.type!==h&&g.type==="K"&&(We(),F.data[g.x][g.z]="D")}function Ke(){return g}const en="maze.js",tn=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:en,create:Ge,getPlayerGridInfo:Ke,loadAssets:Qt,setup:Ye,updatePlayerPosition:je},Symbol.toStringTag,{value:"Module"}));let se=!1,b,U,Me;function nn(){le("orbit_controls",rn),le("house_lights",sn),b=new ct(n.camera,n.renderer.domElement),b.enableDamping=!0,b.enabled=!1,b.minPolarAngle=.02,b.maxPolarAngle=Math.PI-.05,U=new dt(13421772,1),U.intensity=0,n.scene.add(U)}function on(){return n.orbitControlsEnabled?(b.update(),!0):!1}function rn(){if(n.firstPersonModeActive){console.log("Cannot activate orbit controls while in first person view");return}n.orbitControlsEnabled=!n.orbitControlsEnabled;const e=re();n.orbitControlsEnabled?(console.log("Orbit controls enabled"),Me=n.camera.position.y,b.target.set(e.x,e.y,e.z)):(console.log("Orbit controls disabled"),n.camera.position.x=e.x,n.camera.position.y=Me,n.camera.position.z=e.z,n.camera.rotation.set(3*Math.PI/2,0,0),n.renderUpdate()),b.enabled=n.orbitControlsEnabled}function sn(){se=!se,se?(U.intensity=1,n.scene.fog=null,console.log("House lights up")):(U.intensity=0,n.scene.fog=n.fog,console.log("House lights down")),n.renderUpdate()}function an(){b&&b.target.set(n.camera.position.x,a.ballRadius,n.camera.position.z)}const A=new ut(0,0,0,"YZX"),ae=new ft,ln="pointerLockElement"in document;let V=0,q=0;const fe=Math.PI/2;function cn(){if(!ln){console.log("browser does not support pointer lock, first person view will not be available");return}le("first_person",dn),addEventListener("pointerlockchange",()=>{if(n.orbitControlsEnabled){document.pointerLockElement&&(console.log("Cannot switch to first person view while orbit controls are active"),document.exitPointerLock());return}n.firstPersonModeActive?(document.exitPointerLock(),n.camera.rotation.set(-fe,0,0),n.camera.position.y=n.cameraYpos=a.defaultCameraY,Et(be),de(!1),n.firstPersonModeActive=!1,console.log("first person view disabled")):(n.camera.rotation.set(0,-Re(),0),n.camera.position.y=n.cameraYpos=_e(),vt(be),de(!0),n.firstPersonModeActive=!0,console.log("first person view enabled")),n.renderUpdate()})}function dn(){n.firstPersonModeActive?document.exitPointerLock():n.renderer.domElement.requestPointerLock()}function be(e){const t=e.movementX||e.mozMovementX||e.webkitMovementX||0;V=(e.movementY||e.mozMovementY||e.webkitMovementY||0)*a.mouseSensitivity,q=t*a.mouseSensitivity}function fn(){if(!n.firstPersonModeActive)return!1;let e=!1;return(V!==0||q!==0)&&(A.setFromQuaternion(n.camera.quaternion),A.x-=V,A.y-=q,A.x=Math.max(-fe,Math.min(fe,A.x)),n.camera.quaternion.setFromEuler(A),n.camera.getWorldDirection(ae),$e(Math.atan2(ae.x,-ae.z)),V=0,q=0,e=!0),e}Math.random=a.randomSeed?he(a.randomSeed):he();n.errorTexture=gn();n.errorMesh=yn();const y=Object.freeze({init:0,fadeIn:1,play:2,fadeOut:3,pause:4,idle:5});let Le=1,P=y.init;document.addEventListener("DOMContentLoaded",()=>{un([Wt,tn,Nt],pn)});function un(e,t){let o=!1,i=!1;const r=new gt;r.onError=l=>{console.warn("Failed to load asset:",l),i=!0},r.onLoad=function(){o&&(i&&console.error("LoadingManager: finished loading asset files with errors"),t())},e.forEach(l=>{typeof l.loadAssets=="function"?l.loadAssets(r):console.warn(l,"has no loadAssets method")}),o=!0}function pn(){At(),Yt(),Ye(),Fe(je),Ie(),Pt(),nn(),cn(),requestAnimationFrame(Be)}function Be(){let e=!0;switch(P){case y.init:{const t=bt(Le);Ge(t),Ue(t),Oe(t),an(),P=y.fadeIn}break;case y.fadeIn:Gt()&&(P=y.play);break;case y.play:e=ce(),e|=fn(),Ke().type==="O"&&(Le++,n.mazeExited=!0,P=y.fadeOut);break;case y.fadeOut:ce(),jt()&&(P=y.pause);break;case y.pause:setTimeout(()=>{P=y.init},800),P=y.idle;break;case y.idle:break;default:console.log("game_loop(): Unknown game state: "+P),P=y.pause;break}e|=on(),St(),ge(e),requestAnimationFrame(Be)}function gn(){const o=new Uint8Array(1024);for(let r=0;r<1024;r+=4)o[r]=255,o[r+1]=105,o[r+2]=180,o[r+3]=255;const i=new pt(o,16,16);return i.needsUpdate=!0,i}function yn(){const e=new Ee(.1),t=new Ae({color:16738740});return new j(e,t)}
