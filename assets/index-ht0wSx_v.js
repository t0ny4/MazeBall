import{N as T,G as Te}from"./keystrokes-zXtNIVHG.js";import{W as ke,V as F,C as De,B as Fe}from"./planck-BHduNLkk.js";import{T as de,S as K,a as _e,M as Re,b as fe,c as ue,P as pe,d as $e,e as Ie,W as Ye,f as He,C as ge,D as Ue,F as We,R as Ge,g as Xe,h as he,B as Ve,I as Ze,L as je,O as Ke,A as qe,V as Ne,E as Be}from"./three-O2M_k9Px.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const f of a.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();function oe(){let e,t,r,i,o=Array.prototype.slice.call(arguments);if(o.length===0){const s=new Uint32Array(3);window.crypto.getRandomValues(s),o=[s[0],s[1],s[2]]}a(o);function a(s){const c=f();e=c(" "),t=c(" "),r=c(" "),i=1;for(let u=0;u<s.length;u++)e-=c(s[u]),e<0&&(e+=1),t-=c(s[u]),t<0&&(t+=1),r-=c(s[u]),r<0&&(r+=1)}function f(){let s=4022871197;var c=function(u){u=u.toString();const Oe=u.length;for(let V=0;V<Oe;V++){s+=u.charCodeAt(V);var v=.02519603282416938*s;s=v>>>0,v-=s,v*=s,s=v>>>0,v-=s,s+=v*4294967296}return(s>>>0)*23283064365386963e-26};return c}function h(s){return parseInt(s,10)===s}const d=function(){const s=2091639*e+i*23283064365386963e-26;return e=t,t=r,r=s-(i=s|0)};return d.fract53=function(){return d()+(d()*2097152|0)*11102230246251565e-32},d.int32=function(){return d()*4294967296},d.cycle=function(s){s=typeof s>"u"?1:+s,s<1&&(s=1);for(let c=0;c<s;c++)d()},d.range=function(s=0,c=0){if(s===0&&c===0)return 0;if(s>c){const u=s;s=c,c=u}return h(s)&&h(c)?Math.floor(d()*(c-s+1))+s:d()*(c-s)+s},d.restart=function(){a(o)},d.seed=function(){a(Array.prototype.slice.call(arguments))},d}const Qe={_MODULE:"global.js",cameraYpos:0,firstPersonModeActive:!1,mazeExited:!1,orbitControlsEnabled:!1,camera:null,exitLight:null,fog:null,physicsWorld:null,playerLight:null,renderer:null,renderUpdate:()=>{},scene:null},Je={get(e,t){if(t in e)return e[t];throw new Error("Global has no property named "+t)}},n=new Proxy(Object.seal(Qe),Je),et={_MODULE:"config.js",ballRadius:.3,bgColour:1048576,playerLightLevel:.9,textureDir:"./textures/128",randomSeed:0,ballTextureFile:"Tile1.png",minVelocity:.1,exitLightY:.4,floorTextureFiles:["Tile8.png","Tile16.png","Tile24.png","Tile25.png"],mazeHeight:1.2,wallTextureFiles:["Tile11.png","Tile4.png","Tile18.png","Tile20.png","Tile21.png","Tile23.png"],controlKeys:{up:["ArrowUp","w","k"],down:["ArrowDown","s","j"],left:["ArrowLeft","a","h"],right:["ArrowRight","d","l"]},keys:{orbit_controls:"control>enter",house_lights:"shift>enter",first_person:"+"},mouseSensitivity:.005,keyForce:.4,lightYpos:1.4,cameraEase:.08,cameraExitEase:.04,defaultCameraY:4,enableShadows:!0,exitLightLevel:.5,sunLightLevel:.4},tt={get(e,t){if(t in e)return e[t];throw new Error("Config has no property named "+t)},set(e,t){throw new Error("Config is read only, attempted to write to property named "+t)}},l=new Proxy(Object.freeze(et),tt),nt=Math.PI/2;function ot(e){const t=5+e*2,r=t,i={size:{x:t,z:r},start:{x:0,z:0,angle:0},exit:{x:0,z:0},data:Array.from({length:t},()=>Array(r).fill(!1))};let o=it(i.size);return i.start=o.start,i.exit=o.exit,i.end=o.end,i.data[i.exit.x][i.exit.z]="H",i.start.angle=0,i}function rt(e){const t=ot(e);me(t,t.start.x,t.start.z);const r=t.start.x,i=t.start.z;let o=0;return t.data[r-1][i]!==!1?o=1:t.data[r][i+1]!==!1?o=2:t.data[r+1][i]!==!1&&(o=3),t.data[t.start.x][t.start.z]="S",t.data[t.end.x][t.end.z]="E",t.start.angle=o*nt,t}function me(e,t,r){let i=t===e.end.x&&r===e.end.z;for(;;){const o=[];let a;if(r<e.size.z-3&&e.data[t][r+2]===!1&&o.push([0,1]),t<e.size.x-3&&e.data[t+2][r]===!1&&o.push([1,0]),r>2&&e.data[t][r-2]===!1&&o.push([0,-1]),t>2&&e.data[t-2][r]===!1&&o.push([-1,0]),o.length==0)return e.data[t][r]===!1?e.data[t][r]="D":i&&(e.data[t][r]="*"),i;if(e.data[t][r]=".",o.length==1?a=o[0]:a=o[Math.floor(Math.random()*o.length)],me(e,t+a[0]*2,r+a[1]*2)?(e.data[t+a[0]][r+a[1]]="*",i=!0):e.data[t+a[0]][r+a[1]]=".",o.length==1)return i&&(e.data[t][r]="*"),i}}function it(e){const t={},r={};let i=Math.random()>.5,o=Math.random()>.5;t.z=i?e.z-2:1,t.x=o?1:e.x-2;const a=Math.random();a>.5?(i=!i,o=!o):a>.25?i=!i:o=!o,r.z=i?e.z-2:1;const f=i?1:-1;r.x=o?1:e.x-2;const h=o?-1:1,d={...r};return Math.random()>.5?r.z+=f:r.x+=h,{start:t,end:d,exit:r}}let E=0,z=0;function st(){function e(){z+=1}function t(){z-=1}function r(){E-=1}function i(){E+=1}T(l.controlKeys.up,{onPressed:t,onReleased:e}),T(l.controlKeys.down,{onPressed:e,onReleased:t}),T(l.controlKeys.left,{onPressed:r,onReleased:i}),T(l.controlKeys.right,{onPressed:i,onReleased:r})}function at(e){addEventListener("pointermove",e,!1)}function lt(e){removeEventListener("pointermove",e)}function q(e,t){if(!l.keys[e]){console.error("Unknown key index: "+e);return}const r=l.keys[e];r.includes(">")?Te(r,t):T(r,t)}let W;function ct(){W=new ke({gravity:new F(0,0)}),n.physicsWorld=W}function dt(){W.step(1/60),W.clearForces()}const re=new F(0,0),$=new ue,L=l.ballRadius,ie=l.minVelocity;let m,O,N,ye=()=>{console.warn("gUpdateMazePosition not set")};function ft(){return new Promise((e,t)=>{new de().load(l.textureDir+"/ball/"+l.ballTextureFile,i=>{N=i,N.colorSpace=K,e(!0)},null,i=>{t("failed to load texture "+i.target.src)})})}function ut(e){typeof e=="function"&&(ye=e),O=n.physicsWorld.createBody({type:"dynamic",position:re,awake:!1,fixedRotation:!0}),O.createFixture({shape:new De(re,L),restitution:.15,density:.2});const t=new _e(L),r=new Re({map:N});return m=new fe(t,r),m.position.y=L,m.castShadow=!0,n.scene.add(m),[O,m]}function pt(){if(O.isAwake()){const o=O.getLinearVelocity();o.mul(.98),Math.abs(o.x)<ie&&Math.abs(o.y)<ie&&(o.x=0,o.y=0)}const e=O.getPosition(),t=e.y,r=e.x-m.position.x,i=t-m.position.z;return r!==0||i!==0?(m.position.set(e.x,L,t),ye(e.x,L,t),n.firstPersonModeActive||($.makeRotationZ(-r/L),m.matrix.premultiply($),$.makeRotationX(i/L),m.matrix.premultiply($),m.rotation.setFromRotationMatrix(m.matrix)),!0):!1}function gt(){return L}function ht(e){m.visible=!e}let _,G,S,R=0,xe=()=>{console.warn("gUpdateMazePosition not set")};const mt=new F(0,0),we=Math.PI/4,yt=Math.sin(we),xt=Math.cos(we);function wt(){return ft()}function Me(e){typeof e=="function"&&(xe=e),[G,_]=ut(e),S=new pe(16769248,l.playerLightLevel),S.castShadow=!1,n.scene.add(S),n.playerLight=S}function B(){if(E!=0||z!=0){let e;if(E!=0&&z!=0?e=new F(E*xt,z*yt):e=new F(E,z),e.mul(l.keyForce),n.firstPersonModeActive){const t=Math.cos(R),r=Math.sin(R),i=t*e.x-r*e.y,o=r*e.x+t*e.y;e.x=i,e.y=o}Lt(e)}return n.playerLight.position.x=_.position.x,n.playerLight.position.z=_.position.z,pt()}function Mt(e){G.setLinearVelocity(e)}function be(e){Mt(mt),bt(e.start.x,e.start.z),R=-e.start.angle,S.position.set(e.start.x,l.lightYpos,e.start.z),S.intensity=0}function bt(e,t){const r=X();_.position.set(e,r.y,t),G.setPosition({x:e,y:t}),xe(e,r.y,t)}function X(){return _.position}function Le(){return gt()}function Lt(e){G.applyForceToCenter(e)}function Pe(){return R}function ve(e){R=e}function Q(e){ht(e)}const Pt="player.js",vt=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:Pt,getAngle:Pe,getCameraHeight:Le,getPosition:X,hideMesh:Q,loadAssets:wt,setAngle:ve,setNewMaze:be,setup:Me,update:B},Symbol.toStringTag,{value:"Module"}));let p;function At(e=document.body){n.renderUpdate=ne,n.cameraYpos=l.defaultCameraY,n.scene=new $e,n.camera=new Ie(80,window.innerWidth/window.innerHeight),n.renderer=new Ye({antialias:!0}),n.renderer.shadowMap.enabled=l.enableShadows,n.renderer.shadowMap.type=He,e.appendChild(n.renderer.domElement),n.renderer.setPixelRatio(window.devicePixelRatio),n.renderer.setSize(window.innerWidth,window.innerHeight),window.addEventListener("resize",St),n.scene.background=new ge(l.bgColour),p=new Ue(16777215,l.sunLightLevel),p.castShadow=!0,p.position.set(5,20,5),p.shadow.camera.left=-10,p.shadow.camera.right=10,p.shadow.camera.top=0,p.shadow.camera.bottom=-20,p.shadow.camera.near=10,p.shadow.camera.far=25,n.scene.add(p),n.fog=new We(l.bgColour,5,10),n.scene.fog=n.fog}function ne(e=!0){if(!n.orbitControlsEnabled){const t=X();if(n.firstPersonModeActive)n.camera.position.x=t.x,n.camera.position.z=t.z;else{const r=t.x-n.camera.position.x,i=t.z-n.camera.position.z;if(r!=0||i!=0){e=!0;const o=n.mazeExited?l.cameraExitEase:l.cameraEase;o>=1||Math.abs(r)<.008&&Math.abs(i)<.008?(n.camera.position.x=t.x,n.camera.position.z=t.z):(n.camera.position.x+=r*o,n.camera.position.z+=i*o)}}}e&&n.renderer.render(n.scene,n.camera)}function Et(){const e=.1*(l.playerLightLevel-n.playerLight.intensity),t=.1*(l.sunLightLevel-p.intensity);return n.playerLight.intensity+=e,p.intensity+=t,e<.01?(n.playerLight.intensity=l.playerLightLevel,n.exitLight.intensity=l.exitLightLevel,p.intensity=l.sunLightLevel,!0):!1}function zt(){const e=.04*n.playerLight.intensity;return n.playerLight.intensity-=e,n.exitLight.intensity-=e,p.intensity-=e/2,e<.01?(n.playerLight.intensity=0,n.exitLight.intensity=0,p.intensity=0,!0):!1}function St(){n.camera.aspect=window.innerWidth/window.innerHeight,n.camera.updateProjectionMatrix(),n.renderer.setSize(window.innerWidth,window.innerHeight),ne()}const se=Math.PI/2,J=[],ee=[],I=[],y={x:0,z:0,type:""},Ct=new ge(65280);let C,Y,P,M,x,k;function Ae(){C=n.scene,Y=n.camera,P=new pe,C.add(P),n.exitLight=P,P.color=Ct,P.intensity=0,k={size:{x:0,z:0}}}function Ot(){return new Promise((e,t)=>{const r=new je;r.onLoad=()=>{e(!0)},r.onError=o=>{t("failed to load texture "+o)};const i=new de(r);for(const o of l.wallTextureFiles){const a=i.load(l.textureDir+"/walls/"+o);a.colorSpace=K,J.push(a)}for(const o of l.floorTextureFiles){const a=i.load(l.textureDir+"/floors/"+o);a.colorSpace=K,ee.push(a)}})}function Ee(e){k=e,I.length>0&&(I.forEach(s=>n.physicsWorld.destroyBody(s)),I.length=0);const t={type:"static",position:{x:0,y:0}},r=new Fe(.5,.5);for(let s=0;s<e.size.x;s++)for(let c=0;c<e.size.z;c++)if(e.data[s][c]===!1){t.position={x:s,y:c};const u=n.physicsWorld.createBody(t);I.push(u),u.createFixture({shape:r})}const i=e.size.x,o=e.size.z;M&&(C.remove(M),M.geometry.dispose(),M.material.dispose(),M=null),x&&(C.remove(x),x.geometry.dispose(),x.material.dispose(),x=null),M=Tt(e),M.castShadow=!0,M.receiveShadow=!0,C.add(M);const a=Math.floor(Math.random()*ee.length),f=ee[a];f.wrapS=f.wrapT=Ge,f.repeat.set(i+15,o+15);const h=new Xe(i+15,o+15),d=new he({map:f});x=new fe(h,d),x.rotateX(-se),x.position.set((i-1)/2,0,(o-1)/2),x.receiveShadow=!0,C.add(x),n.firstPersonModeActive?Y.rotation.set(0,e.start.angle,0):Y.rotation.set(-se,0,0),Y.position.set(e.start.x,n.cameraYpos,e.start.z),P.position.set(e.exit.x,l.exitLightY,e.exit.z),P.intensity=0,n.mazeExited=!1}function Tt(e){const t=new Ve(1,l.mazeHeight,1),r=Math.floor(Math.random()*J.length),i=J[r],o=new he({map:i}),a=new Ze(t,o,e.size.x*e.size.z);a.count=0;const f=new ue;for(let h=0;h<e.size.x;h++)for(let d=0;d<e.size.z;d++)e.data[h][d]===!1&&(f.setPosition(h,l.mazeHeight/2,d),a.setMatrixAt(a.count++,f));return a}function ze(e,t,r){const i=Math.floor(e+.5),o=Math.floor(r+.5),a=y.x,f=y.z;if(i===a&&o===f)return;const h=y.type;y.x=i,y.z=o,i>=0&&i<k.size.x&&o>=0&&o<k.size.z?y.type=k.data[y.x][y.z]:y.type="O",y.type}function Se(){return y}const kt="maze.js",Dt=Object.freeze(Object.defineProperty({__proto__:null,_MODULE:kt,create:Ee,getPlayerGridInfo:Se,loadAssets:Ot,setup:Ae,updatePlayerPosition:ze},Symbol.toStringTag,{value:"Module"}));let Z=!1,w,D,ae;function Ft(){q("orbit_controls",Rt),q("house_lights",$t),w=new Ke(n.camera,n.renderer.domElement),w.enableDamping=!0,w.enabled=!1,w.minPolarAngle=.02,w.maxPolarAngle=Math.PI-.05,D=new qe(13421772,1),D.intensity=0,n.scene.add(D)}function _t(){return n.orbitControlsEnabled?(w.update(),!0):!1}function Rt(){if(n.firstPersonModeActive){console.log("Cannot activate orbit controls while in first person view");return}n.orbitControlsEnabled=!n.orbitControlsEnabled;const e=X();n.orbitControlsEnabled?(console.log("Orbit controls enabled"),ae=n.camera.position.y,w.target.set(e.x,e.y,e.z)):(console.log("Orbit controls disabled"),n.camera.position.x=e.x,n.camera.position.y=ae,n.camera.position.z=e.z,n.camera.rotation.set(3*Math.PI/2,0,0),n.renderUpdate()),w.enabled=n.orbitControlsEnabled}function $t(){Z=!Z,Z?(D.intensity=1,n.scene.fog=null,console.log("House lights up")):(D.intensity=0,n.scene.fog=n.fog,console.log("House lights down")),n.renderUpdate()}function It(){w&&w.target.set(n.camera.position.x,l.ballRadius,n.camera.position.z)}const A=new Be(0,0,0,"YZX"),j=new Ne,Yt="pointerLockElement"in document;let H=0,U=0;const te=Math.PI/2;function Ht(){if(!Yt){console.log("browser does not support pointer lock, first person view will not be available");return}q("first_person",Ut),addEventListener("pointerlockchange",()=>{if(n.orbitControlsEnabled){document.pointerLockElement&&(console.log("Cannot switch to first person view while orbit controls are active"),document.exitPointerLock());return}n.firstPersonModeActive?(document.exitPointerLock(),n.camera.rotation.set(-te,0,0),n.camera.position.y=n.cameraYpos=l.defaultCameraY,lt(le),Q(!1),n.firstPersonModeActive=!1,console.log("first person view disabled")):(n.camera.rotation.set(0,-Pe(),0),n.camera.position.y=n.cameraYpos=Le(),at(le),Q(!0),n.firstPersonModeActive=!0,console.log("first person view enabled")),n.renderUpdate()})}function Ut(){n.firstPersonModeActive?document.exitPointerLock():n.renderer.domElement.requestPointerLock()}function le(e){const t=e.movementX||e.mozMovementX||e.webkitMovementX||0;H=(e.movementY||e.mozMovementY||e.webkitMovementY||0)*l.mouseSensitivity,U=t*l.mouseSensitivity}function Wt(){if(!n.firstPersonModeActive)return!1;let e=!1;return(H!==0||U!==0)&&(A.setFromQuaternion(n.camera.quaternion),A.x-=H,A.y-=U,A.x=Math.max(-te,Math.min(te,A.x)),n.camera.quaternion.setFromEuler(A),n.camera.getWorldDirection(j),ve(Math.atan2(j.x,-j.z)),H=0,U=0,e=!0),e}Math.random=l.randomSeed?oe(l.randomSeed):oe();const g=Object.freeze({init:0,fadeIn:1,play:2,fadeOut:3,pause:4,idle:5});let ce=1,b=g.init;document.addEventListener("DOMContentLoaded",()=>{Gt([vt,Dt],Xt)});async function Gt(e,t){const r=[];e.forEach(i=>{if(typeof i.loadAssets=="function"){const o=i.loadAssets();o instanceof Promise?r.push(o):console.warn(i,"loadAssets() did not return a promise, it returned",o)}else console.warn(i,"has no loadAssets method")});for(let i=0;i<r.length;i++)try{await r[i]}catch(o){console.warn("loadAssets():",o)}t()}function Xt(){ct(),At(),Ae(),Me(ze),st(),Ft(),Ht(),requestAnimationFrame(Ce)}function Ce(){let e=!0;switch(b){case g.init:{const t=rt(ce);Ee(t),be(t),It(),b=g.fadeIn}break;case g.fadeIn:Et()&&(b=g.play);break;case g.play:e=B(),e|=Wt(),Se().type==="O"&&(ce++,n.mazeExited=!0,b=g.fadeOut);break;case g.fadeOut:B(),zt()&&(b=g.pause);break;case g.pause:setTimeout(()=>{b=g.init},800),b=g.idle;break;case g.idle:break;default:console.log("game_loop(): Unknown game state: "+b),b=g.pause;break}e|=_t(),dt(),ne(e),requestAnimationFrame(Ce)}
