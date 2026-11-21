 "use client";

import { useEffect, useMemo, useState } from "react";
import { Apple, CalendarDays, ChefHat, ClipboardList, Heart, Leaf, ShoppingBasket, Sparkles, X } from "lucide-react";

type Meal = { id:string; slot:string; icon:string; name:string; detail:string; time:string; texture:string; tags:string[]; done:boolean };
type FoodLog = { food:string; date:string; notes:string; reaction:string };
type Grocery = { name:string; category:string; checked:boolean };

const initialMeals: Meal[] = [
  {id:"m1",slot:"Breakfast",icon:"🥣",name:"Soft vegetable dalia",detail:"Broken wheat cooked very soft with carrot and peas, finished with a little ghee.",time:"20 min",texture:"Soft, moist and easy to mash",tags:["Wheat","Vegetables"],done:false},
  {id:"m2",slot:"Mid-morning",icon:"🍌",name:"Ripe banana",detail:"Offer ripe banana mashed or in a safe, age-appropriate shape the baby can manage.",time:"5 min",texture:"Soft and mashed",tags:["Fruit"],done:false},
  {id:"m3",slot:"Lunch",icon:"🍚",name:"Moong dal khichdi",detail:"Well-cooked rice and moong dal with pumpkin; mash lightly while keeping a soft texture.",time:"25 min",texture:"Soft, moist with tender small pieces",tags:["Protein","Iron-rich meal"],done:false},
  {id:"m4",slot:"Evening snack",icon:"🍠",name:"Steamed sweet potato",detail:"Cook until very soft; mash or serve in a safe shape suited to your baby's skills.",time:"15 min",texture:"Very soft",tags:["Seasonal","Vegetable"],done:false},
  {id:"m5",slot:"Dinner",icon:"🥕",name:"Carrot paneer rice",detail:"Soft rice with thoroughly cooked carrot and crumbled pasteurised paneer.",time:"20 min",texture:"Soft, moist and finely crumbled",tags:["Dairy","Vegetables"],done:false}
];

const recipes = [
  {name:"Moong dal khichdi",emoji:"🍚",category:"Lunch",time:"25 min",desc:"A comforting one-pot meal with rice, moong dal and soft vegetables.",ingredients:"Rice, split yellow moong dal, pumpkin or carrot, water, a little ghee.",steps:"Rinse rice and dal. Cook with finely chopped vegetables until very soft. Mash or adjust texture to your baby's developmental skills.",allergens:"May contain none of the major allergens unless cross-contaminated. Check ingredient labels."},
  {name:"Soft vegetable dalia",emoji:"🥣",category:"Breakfast",time:"20 min",desc:"Warm broken wheat porridge with seasonal vegetables.",ingredients:"Broken wheat, carrot, peas, water, a little ghee.",steps:"Rinse dalia. Cook thoroughly with vegetables and extra water until very soft. Cool to a safe eating temperature.",allergens:"Contains wheat (gluten)."},
  {name:"Sweet potato mash",emoji:"🍠",category:"Snack",time:"15 min",desc:"Naturally sweet, soft and simple to prepare.",ingredients:"Sweet potato, water; optional breast milk or prepared formula to loosen.",steps:"Steam or boil until completely tender. Peel and mash, thinning to a soft consistency if needed.",allergens:"Usually no major allergens; check additions."},
  {name:"Spinach and lentil rice",emoji:"🥬",category:"Lunch",time:"30 min",desc:"A soft lentil and rice dish with thoroughly cooked spinach.",ingredients:"Rice, masoor or moong dal, spinach, water, a little oil or ghee.",steps:"Cook rice and dal until very soft. Wash spinach well, cook thoroughly, chop finely and mix through.",allergens:"Check for cross-contact and any individual sensitivities."},
  {name:"Paneer vegetable rice",emoji:"🧀",category:"Dinner",time:"20 min",desc:"Soft rice with pasteurised paneer and cooked vegetables.",ingredients:"Rice, pasteurised paneer, carrot or pumpkin, water.",steps:"Cook rice and vegetables until soft. Crumble paneer finely and mix in; heat through and cool before serving.",allergens:"Contains milk."},
  {name:"Ragi porridge",emoji:"🌾",category:"Breakfast",time:"12 min",desc:"A smooth, well-cooked finger millet porridge.",ingredients:"Ragi flour, water, optional breast milk or prepared formula.",steps:"Whisk ragi flour into cool water. Cook while stirring until fully cooked and smooth. Cool before serving.",allergens:"Check packaged flour for cross-contact."},
  {name:"Egg and vegetable omelette strips",emoji:"🍳",category:"Breakfast",time:"12 min",desc:"Fully cooked egg with soft vegetables, only if egg is already suitable for your baby.",ingredients:"Egg, finely chopped cooked spinach or tomato, a little oil.",steps:"Cook egg completely, with no runny parts. Cut into an age- and skill-appropriate safe shape.",allergens:"Contains egg. Introduce allergens thoughtfully and according to clinician advice."},
  {name:"Pumpkin dal soup",emoji:"🎃",category:"Dinner",time:"20 min",desc:"A thick, nourishing lentil and pumpkin preparation.",ingredients:"Pumpkin, moong dal, water, a little cumin if already tolerated.",steps:"Cook dal and pumpkin until very soft. Mash to a thick consistency; avoid serving as a thin liquid in place of a meal.",allergens:"Check individual tolerance and cross-contact."},
  {name:"Stewed pear",emoji:"🍐",category:"Snack",time:"10 min",desc:"Soft cooked pear for a gentle fruit option.",ingredients:"Ripe pear, a little water.",steps:"Peel if needed, remove core and seeds, then cook until very soft. Mash or cut safely for your baby's skills.",allergens:"Usually no major allergens."}
];

const weekNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const weekPlan = [
  ["Vegetable dalia","Ripe banana","Moong dal khichdi","Sweet potato","Carrot paneer rice"],
  ["Ragi porridge","Stewed pear","Spinach lentil rice","Soft pumpkin mash","Moong dal khichdi"],
  ["Egg omelette*","Banana","Pumpkin dal rice","Yoghurt*","Vegetable dalia"],
  ["Soft oats porridge","Stewed pear","Paneer vegetable rice","Sweet potato","Pumpkin dal soup"],
  ["Vegetable dalia","Ripe banana","Moong dal khichdi","Soft cooked apple","Spinach lentil rice"],
  ["Ragi porridge","Seasonal fruit","Paneer vegetable rice","Pumpkin mash","Soft dal rice"],
  ["Egg omelette*","Stewed pear","Vegetable khichdi","Sweet potato","Carrot paneer rice"]
];

const groceriesSeed: Grocery[] = [
  {name:"Rice",category:"Grains",checked:false},{name:"Moong dal",category:"Pulses",checked:false},
  {name:"Dalia / broken wheat",category:"Grains",checked:false},{name:"Ragi flour",category:"Grains",checked:false},
  {name:"Carrot",category:"Vegetables",checked:false},{name:"Pumpkin",category:"Vegetables",checked:false},
  {name:"Spinach",category:"Vegetables",checked:false},{name:"Sweet potato",category:"Vegetables",checked:false},
  {name:"Banana",category:"Fruits",checked:false},{name:"Pear",category:"Fruits",checked:false},
  {name:"Pasteurised paneer",category:"Dairy",checked:false},{name:"Egg (if already introduced)",category:"Protein",checked:false}
];

export default function Home() {
  const [tab,setTab] = useState("Today");
  const [meals,setMeals] = useState<Meal[]>(initialMeals);
  const [foodLogs,setFoodLogs] = useState<FoodLog[]>([]);
  const [groceries,setGroceries] = useState<Grocery[]>(groceriesSeed);
  const [favourites,setFavourites] = useState<string[]>([]);
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All");
  const [modal,setModal] = useState<{title:string;body:string}|null>(null);
  const [newFood,setNewFood] = useState("");
  const [newNotes,setNewNotes] = useState("");
  const [babyName,setBabyName] = useState("little one");
  const [babyDob,setBabyDob] = useState("");
  const [customGrocery,setCustomGrocery] = useState("");
  const [hydrated,setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("little-bites-v1");
      if (raw) {
        const d = JSON.parse(raw);
        if (d.meals) setMeals(d.meals);
        if (d.foodLogs) setFoodLogs(d.foodLogs);
        if (d.groceries) setGroceries(d.groceries);
        if (d.favourites) setFavourites(d.favourites);
        if (d.babyName) setBabyName(d.babyName);
        if (d.babyDob) setBabyDob(d.babyDob);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("little-bites-v1",JSON.stringify({meals,foodLogs,groceries,favourites,babyName,babyDob}));
  },[meals,foodLogs,groceries,favourites,babyName,babyDob,hydrated]);

  const doneCount = meals.filter(m=>m.done).length;
  const filteredRecipes = useMemo(()=>recipes.filter(r=>(category==="All"||r.category===category)&&(`${r.name} ${r.desc} ${r.ingredients}`.toLowerCase().includes(query.toLowerCase()))),[category,query]);

  function toggleMeal(id:string) { setMeals(old=>old.map(m=>m.id===id?{...m,done:!m.done}:m)); }
  function replaceMeal(id:string) {
    const options = recipes.filter(r=>r.category==="Lunch"||r.category==="Dinner"||r.category==="Breakfast");
    const current = meals.find(m=>m.id===id);
    if (!current) return;
    const next = options.find(r=>r.name!==current.name);
    if (next) setMeals(old=>old.map(m=>m.id===id?{...m,name:next.name,detail:next.desc,time:next.time,done:false,tags:[next.category,"Recipe idea"]}:m));
  }
  function addFood() {
    if (!newFood.trim()) return;
    setFoodLogs(old=>[{food:newFood.trim(),date:new Date().toISOString().slice(0,10),notes:newNotes,reaction:"No reaction recorded"},...old]);
    setNewFood("");setNewNotes("");
  }
  function addGrocery() {
    if (!customGrocery.trim()) return;
    setGroceries(old=>[...old,{name:customGrocery.trim(),category:"Other",checked:false}]);setCustomGrocery("");
  }
  const ageMonths = babyDob ? Math.max(0,Math.floor((Date.now()-new Date(babyDob).getTime())/(1000*60*60*24*30.4375))) : null;

  return <main className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-mark">🍲</div><div><h1>Little Bites</h1><p>A little help with their big little meals</p></div></div>
      <div className="pill"><Leaf size={13} style={{display:"inline",verticalAlign:"middle",marginRight:5}}/> North India · Winter ideas</div>
    </header>
    <nav className="tabs" aria-label="Main navigation">
      {["Today","This week","Recipes","Food tracker","Shopping list","Settings"].map(t=><button key={t} className={`tab ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{t}</button>)}
    </nav>

    <section className="hero">
      <div><div className="eyebrow">A gentle daily rhythm</div><h2>Good food, little by little. 🌼</h2><p>Simple Indian meal ideas for {babyName}. Warm, seasonal inspiration for your kitchen — with room to follow your baby's appetite and cues.</p></div>
      <div className="hero-art" aria-hidden="true">🥕🍐</div>
    </section>

    {tab==="Today" && <>
      <div className="section-head"><div><h3>Today's meal plan</h3><p>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})} · {doneCount} of {meals.length} meals checked off</p></div><button className="action secondary" onClick={()=>setModal({title:"A gentle reminder",body:"Follow your baby's hunger and fullness cues. These are flexible ideas, not a feeding schedule or required portions. Continue breast milk or formula as advised by your child's clinician."})}>Feeding note</button></div>
      <div className="grid">{meals.map(m=><article className="meal-card" key={m.id}>
        <div className="meal-top"><div className="meal-icon">{m.icon}</div><span className="small">{m.time}</span></div>
        <div className="eyebrow">{m.slot}</div><p className="dish">{m.name}</p><p className="small">{m.detail}</p>
        <div>{m.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div>
        <div className="meal-footer"><label className="check"><input type="checkbox" checked={m.done} onChange={()=>toggleMeal(m.id)}/> {m.done?"Done":"Mark done"}</label><button className="action ghost" onClick={()=>replaceMeal(m.id)}>Swap ↗</button></div>
      </article>)}</div>
      <div className="muted-note"><b>Winter kitchen note:</b> Serve freshly prepared food warm, not hot. Cook vegetables until soft and adapt texture and shape to your baby's eating skills. Warm food is a comfort preference, not a nutritional requirement.</div>
    </>}

    {tab==="This week" && <>
      <div className="section-head"><div><h3>Your week at a glance</h3><p>A flexible starting point — swap meals to suit your pantry and your baby's appetite.</p></div><button className="action secondary" onClick={()=>setModal({title:"About this sample plan",body:"This is an illustrative rotation, not a nutritionally assessed prescription. It intentionally includes variety, but you should adapt it to foods already tolerated, family dietary choices, your baby's skills and clinician advice. Items marked * are allergen-containing foods and should only be offered if appropriate for your baby."})}>Plan notes</button></div>
      <div className="week-grid">{weekNames.map((day,i)=><div className="day-card" key={day}><h4>{day}</h4>{["Breakfast","Mid-morning","Lunch","Snack","Dinner"].map((slot,j)=><div className="day-meal" key={slot}><b>{slot}</b><span>{weekPlan[i][j]}</span></div>)}</div>)}</div>
      <div className="muted-note">Use the weekly view for inspiration. It is not a strict timetable; responsive feeding and variety over time matter more than following every suggestion exactly.</div>
    </>}

    {tab==="Recipes" && <>
      <div className="section-head"><div><h3>Little recipe book</h3><p>Everyday ideas using familiar ingredients.</p></div></div>
      <div className="toolbar"><input className="field" placeholder="Search recipes or ingredients…" value={query} onChange={e=>setQuery(e.target.value)}/><select className="field" value={category} onChange={e=>setCategory(e.target.value)}><option>All</option><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option></select></div>
      <div className="recipe-grid" style={{marginTop:14}}>{filteredRecipes.map(r=><article className="recipe-card" key={r.name}><div className="emoji">{r.emoji}</div><div className="eyebrow">{r.category} · {r.time}</div><h4>{r.name}</h4><p className="small">{r.desc}</p><button className="action secondary" onClick={()=>setModal({title:r.name,body:`Ingredients: ${r.ingredients}\n\nPreparation: ${r.steps}\n\nAllergen note: ${r.allergens}\n\nAlways supervise eating, check temperature, and prepare foods in a shape and texture your baby can manage safely.`})}>View recipe</button></article>)}</div>
      {filteredRecipes.length===0&&<div className="empty">No recipes found. Try another search.</div>}
    </>}

    {tab==="Food tracker" && <>
      <div className="section-head"><div><h3>New foods & observations</h3><p>Keep a simple record of foods offered and anything you notice.</p></div></div>
      <div className="panel">
        <h3>Log a food</h3><p className="small">Record what was offered. This is a personal log, not an allergy test or diagnostic tool.</p>
        <div className="toolbar" style={{marginTop:13}}><input className="field" placeholder="Food offered (e.g. well-cooked egg)" value={newFood} onChange={e=>setNewFood(e.target.value)}/><input className="field" placeholder="Notes (optional)" value={newNotes} onChange={e=>setNewNotes(e.target.value)}/><button className="action" onClick={addFood}>Add entry</button></div>
      </div>
      <div className="panel" style={{marginTop:14}}><h3>Food history</h3>{foodLogs.length===0?<div className="empty">No foods logged yet. Your entries will appear here.</div>:foodLogs.map((f,i)=><div className="list-row" key={i}><div style={{flex:1}}><b>{f.food}</b><div className="small">{f.date}{f.notes?` · ${f.notes}`:""}</div></div><span className="tag">{f.reaction}</span></div>)}</div>
      <div className="muted-note"><b>Allergy safety:</b> Introduce allergenic foods in an age-appropriate form and follow your pediatrician's advice, especially if your baby has severe eczema, a known food allergy, or a previous reaction. Stop offering a food and seek medical advice if a reaction occurs. Trouble breathing, throat/tongue swelling, collapse or severe symptoms need emergency help immediately.</div>
    </>}

    {tab==="Shopping list" && <>
      <div className="section-head"><div><h3>Weekly shopping list</h3><p>Starter ingredients inspired by this week's sample plan.</p></div><span className="tag">{groceries.filter(g=>g.checked).length}/{groceries.length} bought</span></div>
      <div className="panel">
        <div className="toolbar"><input className="field" placeholder="Add an ingredient…" value={customGrocery} onChange={e=>setCustomGrocery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addGrocery()}/><button className="action" onClick={addGrocery}>Add item</button><button className="action secondary" onClick={()=>setGroceries(groceriesSeed)}>Reset list</button></div>
        {Array.from(new Set(groceries.map(g=>g.category))).map(cat=><div key={cat}><div className="eyebrow" style={{marginTop:20}}>{cat}</div>{groceries.map((g,i)=>g.category===cat?<label className="list-row" key={`${g.name}-${i}`}><input type="checkbox" checked={g.checked} onChange={()=>setGroceries(old=>old.map((x,j)=>j===i?{...x,checked:!x.checked}:x))}/><span style={{textDecoration:g.checked?"line-through":"none",color:g.checked?"#9aa39b":"inherit"}}>{g.name}</span></label>:null)}</div>)}
      </div>
    </>}

    {tab==="Settings" && <>
      <div className="section-head"><div><h3>Your little one's details</h3><p>Personalise the app. These details stay in this browser.</p></div></div>
      <div className="panel">
        <label className="small">Baby's nickname</label><input className="field" style={{display:"block",margin:"7px 0 16px",width:"100%"}} value={babyName} onChange={e=>setBabyName(e.target.value)}/>
        <label className="small">Date of birth (optional)</label><input className="field" type="date" style={{display:"block",margin:"7px 0 10px",width:"100%"}} value={babyDob} onChange={e=>setBabyDob(e.target.value)}/>
        {ageMonths!==null&&<p className="small">Approximate age: {ageMonths} months. Age calculation is an estimate; developmental readiness and individual needs vary.</p>}
        <div className="muted-note">Your information is saved in local browser storage on this device. It is not uploaded to an account or synced between devices. Clearing browser data may erase it.</div>
      </div>
      <div className="panel" style={{marginTop:14}}><h3>About Little Bites</h3><p className="small">A simple meal-planning companion for families. The initial recipe collection is illustrative and is not a personalised nutrition plan.</p><button className="action secondary" onClick={()=>setModal({title:"Safety & medical disclaimer",body:"Little Bites provides general meal inspiration only. It does not provide medical advice, diagnose allergies, calculate nutritional adequacy, or replace a pediatrician or registered dietitian. Babies differ in growth, development, feeding skills, medical needs and allergy risk. Follow your child's clinician for individual guidance. Always supervise eating, seat baby upright, avoid choking hazards, check food temperature, and use safe food handling and storage. Never force-feed; follow hunger and fullness cues."})}>Read safety disclaimer</button></div>
    </>}

    <footer style={{marginTop:28,textAlign:"center",color:"#9aa39b",fontSize:10}}>Made with care for little appetites · Little Bites</footer>

    {modal&&<div className="modal-backdrop" onClick={()=>setModal(null)}><section className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><h3>{modal.title}</h3><button className="close" onClick={()=>setModal(null)} aria-label="Close"><X size={16}/></button></div><p style={{whiteSpace:"pre-line"}}>{modal.body}</p><button className="action" onClick={()=>setModal(null)}>Got it</button></section></div>}
  </main>;
}