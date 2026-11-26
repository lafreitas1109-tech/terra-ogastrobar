(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const WA="https://wa.me/551126300742?text="+encodeURIComponent("Olá! Gostaria de fazer uma reserva no Terraço Gastrobar. Poderiam me passar mais informações?");
$$('.wa').forEach(a=>a.href=WA);
$('#yr').textContent=new Date().getFullYear();
// marquee
const words=["Gastronomia","Experiência","Sabor","Encontros","Terraço"];
$('#mq').innerHTML=[...words,...words,...words,...words].map(w=>`<span>${w}</span>`).join('');
// preloader (nunca fica preso)
const go=()=>document.body.classList.add('ready');
addEventListener('load',()=>setTimeout(go,900));setTimeout(go,2200);
// divide textos em palavras (máscara)
$$('[data-split]').forEach(el=>{const t=el.textContent.trim().split(/\s+/);
el.setAttribute('aria-label',el.textContent.trim());
el.innerHTML=t.map((w,i)=>`<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ');
if(el.closest('.hero'))el.style.setProperty('--b','1s')});
// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$$('[data-r],[data-split]').forEach(e=>{
if(e.closest('.hero')){requestAnimationFrame(()=>setTimeout(()=>e.classList.add('in'),1000))}else io.observe(e)});
// navbar + parallax
const hd=$('#hd'),par=$$('[data-par]');let tick=false;
const frame=()=>{tick=false;hd.classList.toggle('solid',scrollY>40);
if(!RM)par.forEach(p=>{const r=p.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
p.style.transform=`translate3d(0,${(r.top+r.height/2-innerHeight/2)*-p.dataset.par}px,0)`})};
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});frame();
// menu mobile
const bt=$('#burger'),mn=$('#menu');
const closeMenu=()=>{mn.classList.remove('open');bt.setAttribute('aria-expanded',false)};
bt.onclick=()=>{const o=mn.classList.toggle('open');bt.setAttribute('aria-expanded',o)};
$$('.links a').forEach(a=>a.addEventListener('click',closeMenu));
addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
// cursor (só desktop com mouse)
const cur=$('.cur');
if(cur&&matchMedia('(pointer:fine)').matches&&!RM){let x=0,y=0,cx=0,cy=0;
addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;cur.classList.add('on')});
document.addEventListener('pointerleave',()=>cur.classList.remove('on'));
(function l(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;cur.style.transform=`translate3d(${cx}px,${cy}px,0)`;requestAnimationFrame(l)})();
document.addEventListener('pointerover',e=>cur.classList.toggle('big',!!e.target.closest('a,button')))}
// lightbox
const items=$$('#gal button'),lb=$('#lb'),li=$('#lbi');let cur_=0,last=null;
const show=i=>{cur_=(i+items.length)%items.length;const b=items[cur_],im=$('img',b);
li.innerHTML='';li.className='ph';
if(im){const n=im.cloneNode();n.removeAttribute('loading');n.removeAttribute('width');n.removeAttribute('height');n.style.objectFit='contain';li.appendChild(n)}
else{li.classList.add('missing');li.dataset.need=b.dataset.need}
$('#lbc').textContent=`${cur_+1} / ${items.length}`};
const open=i=>{last=document.activeElement;show(i);lb.hidden=false;document.body.style.overflow='hidden';$('#lbx').focus()};
const close=()=>{lb.hidden=true;document.body.style.overflow='';last&&last.focus()};
items.forEach((b,i)=>b.addEventListener('click',()=>open(i)));
$('#lbx').onclick=close;$('#lbp').onclick=()=>show(cur_-1);$('#lbn').onclick=()=>show(cur_+1);
lb.addEventListener('click',e=>{if(e.target===lb)close()});
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur_-1);if(e.key==='ArrowRight')show(cur_+1)});
})();
