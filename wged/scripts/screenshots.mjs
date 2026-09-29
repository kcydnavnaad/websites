import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
for (const [name,w,h] of [['d',1440,900],['m',390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} });
  const errs=[]; p.on('console',m=>{ if(m.type()==='error'||m.type()==='warning') errs.push(m.text())}); p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://localhost:4173/'); await p.waitForTimeout(4500);
  await p.screenshot({path:`/tmp/shots/${name}-0-hero.png`});
  const top = await p.evaluate(()=>document.getElementById('werkwijze').offsetTop);
  const H = await p.evaluate(()=>document.getElementById('werkwijze').offsetHeight - innerHeight);
  for (const [i,f] of [[1,0.1],[2,0.35],[3,0.6],[4,0.9]]) {
    await p.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}), top + H*f); await p.waitForTimeout(900);
    await p.screenshot({path:`/tmp/shots/${name}-${i}-proc.png`});
  }
  for (const id of ['diensten','over','tools','contact']) {
    await p.evaluate(id=>document.getElementById(id).scrollIntoView({behavior:'instant'}), id); await p.waitForTimeout(1200);
    await p.screenshot({path:`/tmp/shots/${name}-s-${id}.png`});
  }
  console.log(name, errs.slice(0,5));
}
await b.close();
