"use strict";(self.webpackChunkbig_screen_builder=self.webpackChunkbig_screen_builder||[]).push([[1415],{43777:function(t,e,i){i.r(e),i.d(e,{default:function(){return w}});var n=i(72791),o=i(65362),r=i(1413),a=i(29439),c=i(76543),h=i(15671),s=i(43144),u=(0,i(10009).Z)();u.on("dispathEvent",(function(t){var e=t.target,i=t.action;console.log("action.".concat(i,".").concat(e)),u.emit("action.".concat(i,".").concat(e))}));var d=function(){function t(e,i){(0,h.Z)(this,t),this.id=void 0,this.eventConfig=void 0,this.id=e,this.eventConfig=i}return(0,s.Z)(t,[{key:"on",value:function(t,e){u.on("action.".concat(t,".").concat(this.id),e)}},{key:"off",value:function(t,e){u.off("action.".concat(t,".").concat(this.id),e)}},{key:"emit",value:function(t){u.emit("dispathEvent",this.eventConfig[t])}}]),t}(),g=i(80184),f=function(t){var e=t.item,i=e.component.ViewComponent,n=e.id,o=e.getShape(),r=o.size,a=o.position,c=o.rotate,h=e.getPropConfigValue(),s=e.getEventConfigValue(),u=new d(n,s);return(0,g.jsx)("div",{style:{position:"absolute",top:0,left:0,boxSizing:"border-box",width:r.width,height:r.height,transform:"translate(".concat(a.x,"px, ").concat(a.y,"px) rotate(").concat(c,"deg)")},children:(0,g.jsx)(i,{eventBus:u,properties:h,shape:{size:r,position:a,rotate:c}})})},l=n.memo(f);function p(){return{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}}var m=function(t){var e=t.page,i=e.getItems(),o=e.getConfig(),h=o.size,s=o.scaleMode,u=o.backgroundColor,d=n.useState(p()),f=(0,a.Z)(d,2),m=f[0],v=f[1],w=function(t,e,i){var n,o;if(i===c.g.uniform)return n=t.width/t.height>e.width/e.height?e.width/t.width:e.height/t.height,{position:"absolute",top:"50%",left:"50%",transformOrigin:"0px 0px",transform:"scale(".concat(n,") translate(-50%, -50%)")};if(i===c.g.stretch){var r=e.width/t.width,a=e.height/t.height;return{position:"absolute",top:0,left:0,transformOrigin:"0px 0px",transform:"scale(".concat(r,", ").concat(a,")")}}return i===c.g.filled?(o=t.width/t.height>e.width/e.height?e.height/t.height:e.width/t.width,{position:"absolute",top:0,left:0,transformOrigin:"0px 0px",transform:"scale(".concat(o,")")}):{position:"absolute",top:"50%",left:"50%",transformOrigin:"0px 0px",transform:"translate(-50%, -50%)"}}(h,m,s),b=function(){v(p())};return n.useEffect((function(){return window.addEventListener("resize",b),function(){window.removeEventListener("resize",b)}}),[]),(0,g.jsx)("div",{style:{width:"100vw",height:"100vh",backgroundColor:u},children:(0,g.jsx)("div",{style:(0,r.Z)({width:h.width,height:h.height,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundImage:"url(".concat("http://datav-react.jiaminghi.com/demo/electronic-file/static/media/bg.110420cf.png",")")},w),children:i.map((function(t){return(0,g.jsx)(l,{item:t})}))})})},v=n.memo(m),w=function(){var t=localStorage.getItem("data");if(!t)return null;var e=o.Z.deserializePage(JSON.parse(t));return(0,g.jsx)(v,{page:e})}}}]);
//# sourceMappingURL=1415.3964f8f7.chunk.js.map