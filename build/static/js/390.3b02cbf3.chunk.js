"use strict";(self.webpackChunktodo=self.webpackChunktodo||[]).push([[390],{513:(e,s,r)=>{r.d(s,{X:()=>o});var t=r(43),l=r(216),n=r(579);const o=e=>s=>{const r=(0,l.Zp)();return(0,t.useEffect)((()=>{if(!window.sessionStorage.getItem("user"))return r("/login")}),[r]),(0,n.jsx)(e,{...s})}},390:(e,s,r)=>{r.r(s),r.d(s,{default:()=>i});var t=r(421),l=r(43),n=r(652),o=r(663),a=r(513),c=r(579);const i=(0,a.X)((function(){const[e,s]=(0,l.useState)(!1),r=(0,l.useRef)(),a=(0,l.useRef)(),i=(0,l.useRef)(),{loading:u,setLoading:d,registerUser:b}=(0,l.useContext)(o.z);return(0,l.useEffect)((()=>{u&&d(!1),window.sessionStorage.removeItem("user")}),[]),(0,c.jsx)("div",{className:"flex items-center justify-center h-screen",children:(0,c.jsx)("form",{className:"w-80 p-4 bg-white shadow rounded",onSubmit:e=>{e.preventDefault()},children:(0,c.jsxs)("div",{children:[(0,c.jsx)("h5",{className:"text-xl font-bold mb-4 text-center",children:"Register"}),(0,c.jsx)("label",{className:"block mb-2",children:"Name"}),(0,c.jsx)("input",{type:"text",name:"name",ref:r,className:"w-full mb-2 px-2 py-1 border border-gray-300 rounded"}),(0,c.jsx)("label",{className:"block mb-2",children:"Email"}),(0,c.jsx)("input",{type:"text",name:"email",ref:a,className:"w-full mb-2 px-2 py-1 border border-gray-300 rounded"}),(0,c.jsxs)("label",{className:"flex justify-between block mb-2",children:["Password",(0,c.jsx)("div",{children:e?(0,c.jsx)(n.BI9,{className:"inline-block ml-2 cursor-pointer",onClick:()=>s(!1)}):(0,c.jsx)(n.U3x,{className:"inline-block ml-2 cursor-pointer",onClick:()=>s(!0)})})]}),(0,c.jsx)("input",{type:e?"text":"password",name:"password",ref:i,className:"w-full mb-2 px-2 py-1 border border-gray-300 rounded"}),(0,c.jsx)("button",{disabled:u,onClick:()=>b(r.current.value,a.current.value,i.current.value),className:"w-full px-4 py-1 mb-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none",children:u?(0,c.jsx)(t.A,{color:"white",size:6}):"Register"}),(0,c.jsx)("p",{className:"text-center mb-2",children:"or"}),(0,c.jsx)("button",{className:"w-full px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none",children:"Login with Auth0"})]})})})}))}}]);
//# sourceMappingURL=390.3b02cbf3.chunk.js.map