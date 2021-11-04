(this.webpackJsonptimer=this.webpackJsonptimer||[]).push([[0],{17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var i=n(1),a=n.n(i),s=n(11),c=n.n(s),r=n(3),u=n(4),o=n(9),d=n(2),l=n(6),m=n(8),j=n(7),p=n(5),b=n(0),h=function(e){Object(m.a)(n,e);var t=Object(j.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.value,i=e.onChange;return Object(b.jsx)("input",{type:"text",name:t,value:n,onChange:i})}}]),n}(i.Component),v=h;var O=function(e){var t=Object(i.useRef)(null),n=e.canPlay,a=e.handleEnd;return n&&t.current.play(),Object(b.jsx)("video",{className:"timeout-video",ref:t,onEnded:a,preload:"auto",children:Object(b.jsx)("source",{src:"".concat("/timer","/assets/explosion.mp4"),type:"video/mp4"})})},f=["The Ink Spots - It's All Over But The Crying","Billie Holiday - Easy Living","Andrews Sisters & Danny Kaye - Civilization","The Ink Spots - I Don't Want To Set The World On Fire","Connie Allen - Rocket 69"],y="/timer",x=function e(t){var n=this;Object(d.a)(this,e),this.play=function(){var e=n.music,t=n.musicName,i=n.updateMusicName;e.play(),i(t)},this.pause=function(){n.music.pause()},this.isPlaying=function(){return!n.music.paused},this.handleNext=function(){var e=n.index+1;e===f.length-1&&(e=0),n.index=e,n.musicName=f[e],n.updateMusicName(n.musicName),n.music.src="".concat(y,"/assets/soundtrack/").concat(f[e]),n.music.play()},this.updateMusicName=t,this.musicName=f[0],this.music=new Audio("".concat(y,"/assets/soundtrack/").concat(f[0],".mp3")),this.music.addEventListener("ended",(function(){return n.handleNext()})),this.index=0},N=(n(17),function(e){Object(m.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(d.a)(this,n),(e=t.call(this)).startTimer=function(){var t=e.state.soundtrack;t.isPlaying()||t.play();var n=setInterval((function(){e.timerHandler(n)}),1e3);e.setState({isStarted:!0,isPaused:!1,timer:n})},e.pauseTimer=function(){var t=e.state,n=t.timer,i=t.fieldsBlinker;clearInterval(n),clearInterval(i),e.setState({isPaused:!0,timer:null,fieldsBlinker:null,timerDisplay:!0})},e.resetTimer=function(){e.setState({hour:0,minute:0,second:0,isStarted:!1,isPaused:!1,isEnded:!1,timer:null})},e.endTimer=function(){e.state.soundtrack.pause();var t=setInterval((function(){e.setState((function(e){return{timerDisplay:!e.timerDisplay}}))}),500);e.setState({fieldsBlinker:t,isEnded:!0,isStarted:!1,isPaused:!1})},e.timerHandler=function(t){var n=e.state.time,i=Object.values(n).map((function(e){return Number(e)})),a=Object(o.a)(i,3),s=a[0],c=a[1],d=a[2];0===s&&0===c&&0===d?(clearInterval(t),e.endTimer()):0===c&&0===d?(s-=1,c=59,d=59):0===d?(c-=1,d=59):d-=1,n=Object.entries({hour:s,minute:c,second:d}).reduce((function(e,t){var n=Object(o.a)(t,2),i=n[0],a=n[1];return Object(u.a)(Object(u.a)({},e),{},Object(r.a)({},i,a<10?"0".concat(a):String(a)))}),{}),e.setState({time:n})},e.endIntro=function(){return e.setState({introEnded:!0})},e.endTimeoutVideo=function(){return e.setState({isEnded:!1})},e.onChange=function(t){var n=t.target,i=n.name,a=n.value,s=e.state.time;(a=(a=Number(a))<10?"0".concat(a):String(a)).length<=2&&Number(a)<=59&&e.setState({time:Object(u.a)(Object(u.a)({},s),{},Object(r.a)({},i,a))})},e.updateMusicName=function(t){return e.setState({musicName:t})};var i=new x(e.updateMusicName);return e.state={time:{hour:"00",minute:"00",second:"00"},timer:null,isStarted:!1,isPaused:!1,isEnded:!1,introEnded:!1,soundtrack:i,musicName:"Awaiting User",fieldsBlinker:null,timerDisplay:!0},e}return Object(l.a)(n,[{key:"componentWillUnmount",value:function(){var e=this.state,t=e.soundtrack,n=e.timer,i=e.fieldsBlinker;t.pause(),clearInterval(n),clearInterval(i)}},{key:"render",value:function(){var e=this.state,t=e.time,n=e.isStarted,i=e.isPaused,a=e.isEnded,s=e.introEnded,c=e.musicName,r=e.timerDisplay,u=t.hour,d=t.minute,l=t.second,m=this.startTimer,j=this.pauseTimer,h=this.resetTimer,f=this.onChange,y=this.endIntro,x=this.endTimeoutVideo,N="/timer";return document.title="Pip Boy's Timer (".concat(u,":").concat(d,":").concat(l,")"),Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)("img",{src:"".concat(N,"/assets/pip-boy.png"),alt:"Pip Boy",className:"pip-boy-image"}),Object(b.jsx)(O,{canPlay:a,handleEnd:x}),Object(b.jsxs)("div",{className:"pip-boy-screen",children:[!s&&Object(b.jsx)("video",{autoPlay:!0,muted:!0,onEnded:y,className:"intro-video",children:Object(b.jsx)("source",{src:"".concat(N,"/assets/initialize.mp4"),type:"video/mp4"})}),Object(b.jsx)("h2",{className:"music-name",children:c}),Object(b.jsx)("div",{className:"timer".concat(n?"":"-input").concat(r?"":" hidden"),children:Object.entries(t).map((function(e,t,i){var a=Object(o.a)(e,2),s=a[0],c=a[1];return Object(b.jsxs)(b.Fragment,{children:[n?Object(b.jsx)("span",{children:c},s):Object(b.jsx)(v,{name:s,value:c,onChange:f},s),t!==i.length-1&&":"]})}))}),n?i?Object(b.jsxs)("div",{children:[Object(b.jsx)("button",{type:"button",onClick:m,children:Object(b.jsx)(p.c,{})}),Object(b.jsx)("button",{type:"button",onClick:h,children:Object(b.jsx)(p.b,{})})]}):Object(b.jsx)("button",{type:"button",onClick:j,children:Object(b.jsx)(p.a,{})}):Object(b.jsx)("button",{type:"button",onClick:m,children:Object(b.jsx)(p.c,{})})]})]})}}]),n}(i.Component));c.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(N,{})}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.99207a75.chunk.js.map