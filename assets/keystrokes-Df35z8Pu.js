var g=Object.defineProperty,w=(o,e,t)=>e in o?g(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,r=(o,e,t)=>(w(o,typeof e!="symbol"?e+"":e,t),t);const R={addEventListener:(...o)=>{},removeEventListener:(...o)=>{},dispatchEvent:(...o)=>{}},x={userAgent:""},f=()=>typeof document<"u"?document:R,A=()=>typeof navigator<"u"?navigator:x,E=()=>A().userAgent.toLowerCase().includes("mac");let b=!1;const q=o=>{!E()||o.key!=="Meta"||(b=!0)},I=o=>{!b||o.key!=="Meta"||(b=!1,k())},p=new Map,L=o=>{p.set(o.key,o)},M=o=>{p.delete(o.key)},k=()=>{for(const o of p.values()){const e=new KeyboardEvent("keyup",{key:o.key,code:o.code,bubbles:!0,cancelable:!0});f().dispatchEvent(e)}p.clear()},B=o=>{try{const e=()=>o();return addEventListener("focus",e),()=>{removeEventListener("focus",e)}}catch{}},W=o=>{try{const e=()=>{k(),o()};return addEventListener("blur",e),()=>removeEventListener("blur",e)}catch{}},z=o=>{try{const e=t=>{L(t),q(t),o({key:t.key,aliases:[`@${t.code}`],originalEvent:t,composedPath:()=>t.composedPath(),preventDefault:()=>t.preventDefault()})};return f().addEventListener("keydown",e),()=>f().removeEventListener("keydown",e)}catch{}},T=o=>{try{const e=t=>{M(t),I(t),o({key:t.key,aliases:[`@${t.code}`],originalEvent:t,composedPath:()=>t.composedPath(),preventDefault:()=>t.preventDefault()})};return f().addEventListener("keyup",e),()=>f().removeEventListener("keyup",e)}catch{}};class P{constructor(e){r(this,"_onPressed"),r(this,"_onPressedWithRepeat"),r(this,"_onReleased"),r(this,"_isPressed"),r(this,"_identity"),this._isPressed=!1,this._identity=e,typeof e=="function"?this._onPressedWithRepeat=e:(this._onPressed=e.onPressed,this._onPressedWithRepeat=e.onPressedWithRepeat,this._onReleased=e.onReleased)}get isEmpty(){return!this._onPressed&&!this._onPressedWithRepeat&&!this._onReleased}isOwnHandler(e){return this._identity===e}executePressed(e){var t,s;this._isPressed||(t=this._onPressed)==null||t.call(this,e),this._isPressed=!0,(s=this._onPressedWithRepeat)==null||s.call(this,e)}executeReleased(e){var t;this._isPressed&&((t=this._onReleased)==null||t.call(this,e)),this._isPressed=!1}}const K=class _{constructor(e,t,s={}){r(this,"_normalizedKeyCombo"),r(this,"_parsedKeyCombo"),r(this,"_handlerState"),r(this,"_keyComboEventMapper"),r(this,"_movingToNextSequenceAt"),r(this,"_sequenceIndex"),r(this,"_unitIndex"),r(this,"_lastActiveKeyPresses"),r(this,"_lastActiveKeyCount"),r(this,"_isPressedWithFinalUnit"),this._normalizedKeyCombo=_.normalizeKeyCombo(e),this._parsedKeyCombo=_.parseKeyCombo(e),this._handlerState=new P(s),this._keyComboEventMapper=t,this._movingToNextSequenceAt=0,this._sequenceIndex=0,this._unitIndex=0,this._lastActiveKeyPresses=[],this._lastActiveKeyCount=0,this._isPressedWithFinalUnit=null}static parseKeyCombo(e){if(_._parseCache[e])return _._parseCache[e];const t=e.toLowerCase();let s="",n=[],i=[n],a=[i];const l=[a];let d=!1;for(let h=0;h<e.length;h+=1)if(t[h]==="\\")d=!0;else if((t[h]==="+"||t[h]===">"||t[h]===",")&&!d){if(s)throw new Error("cannot have two operators in a row");s=t[h]}else t[h].match(/[^\s]/)&&(s&&(s===","?(n=[],i=[n],a=[i],l.push(a)):s===">"?(n=[],i=[n],a.push(i)):s==="+"&&(n=[],i.push(n)),s=""),d=!1,n.push(t[h]));const y=l.map(h=>h.map(m=>m.map(v=>v.join(""))));return _._parseCache[e]=y,y}static stringifyKeyCombo(e){return e.map(t=>t.map(s=>s.map(n=>n==="+"?"\\+":n===">"?"\\>":n===","?"\\,":n).join("+")).join(">")).join(",")}static normalizeKeyCombo(e){if(_._normalizationCache[e])return _._normalizationCache[e];const t=this.stringifyKeyCombo(this.parseKeyCombo(e));return _._normalizationCache[e]=t,t}get isPressed(){return!!this._isPressedWithFinalUnit}get sequenceIndex(){return this.isPressed?this._parsedKeyCombo.length:this._sequenceIndex}isOwnHandler(e){return this._handlerState.isOwnHandler(e)}executePressed(e){var t,s;!((t=this._isPressedWithFinalUnit)!=null&&t.has(e.key))&&!((s=e.aliases)!=null&&s.some(n=>{var i;return(i=this._isPressedWithFinalUnit)==null?void 0:i.has(n)}))||this._handlerState.executePressed(this._wrapEvent(this._lastActiveKeyPresses,{key:e.key,aliases:new Set(e.aliases),event:e}))}executeReleased(e){var t,s;!((t=this._isPressedWithFinalUnit)!=null&&t.has(e.key))&&!((s=e.aliases)!=null&&s.some(n=>{var i;return(i=this._isPressedWithFinalUnit)==null?void 0:i.has(n)}))||(this._handlerState.executeReleased(this._wrapEvent(this._lastActiveKeyPresses,{key:e.key,aliases:new Set(e.aliases),event:e})),this._isPressedWithFinalUnit=null)}updateState(e,t){const s=e.length,n=s<this._lastActiveKeyCount;this._lastActiveKeyCount=s;const i=this._parsedKeyCombo[this._sequenceIndex],a=i.slice(0,this._unitIndex),l=i.slice(this._unitIndex),d=()=>{this._movingToNextSequenceAt=0,this._sequenceIndex=0,this._unitIndex=0,this._lastActiveKeyPresses.length=0,this._handlerState.isEmpty&&(this._isPressedWithFinalUnit=null)};let y=0;if(n){if(this._movingToNextSequenceAt===0)return d();if(this._movingToNextSequenceAt+t<Date.now()||s!==0)return;this._movingToNextSequenceAt=0,this._sequenceIndex+=1,this._unitIndex=0;return}for(const h of a){for(const m of h){let v=!1;for(let c=y;c<e.length&&c<y+h.length;c+=1)if(e[c].key===m||e[c].aliases.has(m)){v=!0;break}if(!v)return d()}y+=h.length}if(this._movingToNextSequenceAt===0){for(const h of l){for(const m of h){let v=!1;for(let c=y;c<e.length&&c<y+h.length;c+=1)if(e[c].key===m||e[c].aliases.has(m)){v=!0;break}if(!v)return}this._unitIndex+=1,y+=h.length}if(y<s-1)return d();if(this._lastActiveKeyPresses[this._sequenceIndex]=e.slice(0),this._sequenceIndex<this._parsedKeyCombo.length-1){this._movingToNextSequenceAt=Date.now();return}this._isPressedWithFinalUnit=new Set(i[i.length-1])}}_wrapEvent(e,t){return{...this._keyComboEventMapper(e,t),keyCombo:this._normalizedKeyCombo,keyEvents:e.flat().map(s=>s.event),finalKeyEvent:t.event}}};r(K,"_parseCache",{}),r(K,"_normalizationCache",{});let u=K;const F=1e3;class U{constructor(e={}){r(this,"sequenceTimeout"),r(this,"_isActive"),r(this,"_unbinder"),r(this,"_onActiveBinder"),r(this,"_onInactiveBinder"),r(this,"_onKeyPressedBinder"),r(this,"_onKeyReleasedBinder"),r(this,"_keyComboEventMapper"),r(this,"_selfReleasingKeys"),r(this,"_keyRemap"),r(this,"_handlerStates"),r(this,"_keyComboStates"),r(this,"_keyComboStatesArray"),r(this,"_activeKeyPresses"),r(this,"_activeKeyMap"),r(this,"_watchedKeyComboStates"),this.sequenceTimeout=F,this._isActive=!0,this._onActiveBinder=()=>{},this._onInactiveBinder=()=>{},this._onKeyPressedBinder=()=>{},this._onKeyReleasedBinder=()=>{},this._keyComboEventMapper=()=>({}),this._selfReleasingKeys=[],this._keyRemap={},this._handlerStates={},this._keyComboStates={},this._keyComboStatesArray=[],this._activeKeyPresses=[],this._activeKeyMap=new Map,this._watchedKeyComboStates={},this.bindEnvironment(e)}get pressedKeys(){return this._activeKeyPresses.map(e=>e.key)}bindKey(e,t){var s;if(typeof e=="object"){for(const i of e)this.bindKey(i,t);return}e=e.toLowerCase();const n=new P(t);(s=this._handlerStates)[e]??(s[e]=[]),this._handlerStates[e].push(n)}unbindKey(e,t){if(typeof e=="object"){for(const n of e)this.unbindKey(n,t);return}e=e.toLowerCase();const s=this._handlerStates[e];if(s)if(t)for(let n=0;n<s.length;n+=1)s[n].isOwnHandler(t)&&(s.splice(n,1),n-=1);else s.length=0}bindKeyCombo(e,t){var s;if(typeof e=="object"){for(const i of e)this.bindKeyCombo(i,t);return}e=u.normalizeKeyCombo(e);const n=new u(e,this._keyComboEventMapper,t);(s=this._keyComboStates)[e]??(s[e]=[]),this._keyComboStates[e].push(n),this._keyComboStatesArray.push(n)}unbindKeyCombo(e,t){if(typeof e=="object"){for(const n of e)this.unbindKeyCombo(n,t);return}e=u.normalizeKeyCombo(e);const s=this._keyComboStates[e];if(s)if(t){for(let n=0;n<s.length;n+=1)if(s[n].isOwnHandler(t)){for(let i=0;i<this._keyComboStatesArray.length;i+=1)this._keyComboStatesArray[i]===s[n]&&(this._keyComboStatesArray.splice(i,1),i-=1);s.splice(n,1),n-=1}}else s.length=0}checkKey(e){return e=e.toLowerCase(),this._activeKeyPresses.some(t=>t.key===e||t.aliases.has(e))}checkKeyCombo(e){return this._ensureCachedKeyComboState(e).isPressed}checkKeyComboSequenceIndex(e){return this._ensureCachedKeyComboState(e).sequenceIndex}bindEnvironment(e={}){this.unbindEnvironment(),this._onActiveBinder=e.onActive??B,this._onInactiveBinder=e.onInactive??W,this._onKeyPressedBinder=e.onKeyPressed??z,this._onKeyReleasedBinder=e.onKeyReleased??T,this._keyComboEventMapper=e.mapKeyComboEvent??(()=>({})),this._selfReleasingKeys=e.selfReleasingKeys??[],this._keyRemap=e.keyRemap??{};const t=this._onActiveBinder(()=>{this._isActive=!0}),s=this._onInactiveBinder(()=>{this._isActive=!1}),n=this._onKeyPressedBinder(a=>{this._handleKeyPress(a)}),i=this._onKeyReleasedBinder(a=>{this._handleKeyRelease(a)});this._unbinder=()=>{t==null||t(),s==null||s(),n==null||n(),i==null||i()}}unbindEnvironment(){var e;(e=this._unbinder)==null||e.call(this)}_ensureCachedKeyComboState(e){e=u.normalizeKeyCombo(e),this._watchedKeyComboStates[e]||(this._watchedKeyComboStates[e]=new u(e,this._keyComboEventMapper));const t=this._watchedKeyComboStates[e];return t.updateState(this._activeKeyPresses,this.sequenceTimeout),t}_handleKeyPress(e){var t;if(!this._isActive)return;e={...e,key:e.key.toLowerCase(),aliases:((t=e.aliases)==null?void 0:t.map(a=>a.toLowerCase()))??[]};const s=this._keyRemap[e.key];s&&(e.key=s);for(let a=0;a<e.aliases.length;a+=1){const l=this._keyRemap[e.aliases[a]];l&&(e.aliases[a]=l)}const n=this._handlerStates[e.key];if(n)for(const a of n)a.executePressed(e);for(let a=0;a<e.aliases.length;a+=1){const l=this._handlerStates[e.aliases[a]];if(l)for(const d of l)d.executePressed(e)}const i=this._activeKeyMap.get(e.key);if(i)i.event=e;else{const a={key:e.key,aliases:new Set(e.aliases),event:e};this._activeKeyMap.set(e.key,a),this._activeKeyPresses.push(a)}this._updateKeyComboStates();for(const a of this._keyComboStatesArray)a.executePressed(e)}_handleKeyRelease(e){var t;e={...e,key:e.key.toLowerCase(),aliases:((t=e.aliases)==null?void 0:t.map(i=>i.toLowerCase()))??[]};const s=this._keyRemap[e.key];if(s&&(e.key=s),e.aliases)for(let i=0;i<e.aliases.length;i+=1){const a=this._keyRemap[e.aliases[i]];a&&(e.aliases[i]=a)}const n=this._handlerStates[e.key];if(n)for(const i of n)i.executeReleased(e);for(let i=0;i<e.aliases.length;i+=1){const a=this._handlerStates[e.aliases[i]];if(a)for(const l of a)l.executeReleased(e)}if(this._activeKeyMap.has(e.key)){this._activeKeyMap.delete(e.key);for(let i=0;i<this._activeKeyPresses.length;i+=1)if(this._activeKeyPresses[i].key===e.key){this._activeKeyPresses.splice(i,1),i-=1;break}}this._tryReleaseSelfReleasingKeys(),this._updateKeyComboStates();for(const i of this._keyComboStatesArray)i.executeReleased(e)}_updateKeyComboStates(){for(const e of this._keyComboStatesArray)e.updateState(this._activeKeyPresses,this.sequenceTimeout)}_tryReleaseSelfReleasingKeys(){for(const e of this._activeKeyPresses)for(const t of this._selfReleasingKeys)e.key===t&&this._handleKeyRelease(e.event)}}let j,C;const N=o=>{C=new U(j)},S=()=>(C||N(),C),O=(...o)=>S().bindKey(...o),D=(...o)=>S().bindKeyCombo(...o);u.normalizeKeyCombo;u.stringifyKeyCombo;u.parseKeyCombo;export{D as G,O as N};
