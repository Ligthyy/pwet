import {J as Je,E,X}from'./chunk-H0xd85um.js';import {t}from'./chunk-C4eFgJ1X.js';import {ah as q$1,w as w$1,a5 as Re,J as Jn,ar as m,as as l,aO as U}from'./main-JDGY3PWR.js';var h="cardscanner",w="cardscanner-entries",b=`
CREATE TABLE IF NOT EXISTS entries (
  id TEXT PRIMARY KEY,
  game TEXT NOT NULL,
  card_id TEXT,
  language TEXT,
  name TEXT NOT NULL,
  set_name TEXT,
  set_code TEXT,
  number TEXT,
  image_url TEXT,
  rarity TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  variant TEXT NOT NULL DEFAULT 'normal',
  price_amount REAL,
  price_currency TEXT NOT NULL DEFAULT 'EUR',
  price_source TEXT NOT NULL DEFAULT 'none',
  price_updated_at TEXT,
  status TEXT NOT NULL DEFAULT 'identified',
  scanned_at TEXT NOT NULL,
  raw_ocr TEXT
);
CREATE INDEX IF NOT EXISTS idx_entries_game_card ON entries (game, card_id);
`,N=(()=>{let n=class n{constructor(){this.isNative=U.isNativePlatform(),this.sqlite=null,this.db=null,this.initPromise=null;}init(){return this.initPromise||(this.initPromise=this.doInit()),this.initPromise}async doInit(){if(!this.isNative)return;this.sqlite=new E(X);let t=await this.sqlite.checkConnectionsConsistency(),i=await this.sqlite.isConnection(h,false);t.result&&i.result?this.db=await this.sqlite.retrieveConnection(h,false):this.db=await this.sqlite.createConnection(h,false,"no-encryption",1,false),await this.db.open(),await this.db.execute(b);try{await this.db.execute("ALTER TABLE entries ADD COLUMN variant TEXT NOT NULL DEFAULT 'normal'");}catch{}}async getAll(){return await this.init(),this.isNative?((await this.db.query("SELECT * FROM entries ORDER BY scanned_at DESC")).values??[]).map(I):this.webRead()}async upsert(t){if(await this.init(),!this.isNative){let i=this.webRead(),a=i.findIndex(r=>r.id===t.id);a>=0?i[a]=t:i.unshift(t),this.webWrite(i);return}await this.db.run(`INSERT INTO entries (
        id, game, card_id, language, name, set_name, set_code, number, image_url, rarity,
        quantity, variant, price_amount, price_currency, price_source, price_updated_at,
        status, scanned_at, raw_ocr
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        game = excluded.game,
        card_id = excluded.card_id,
        language = excluded.language,
        variant = excluded.variant,
        name = excluded.name,
        set_name = excluded.set_name,
        set_code = excluded.set_code,
        number = excluded.number,
        image_url = excluded.image_url,
        rarity = excluded.rarity,
        quantity = excluded.quantity,
        price_amount = excluded.price_amount,
        price_currency = excluded.price_currency,
        price_source = excluded.price_source,
        price_updated_at = excluded.price_updated_at,
        status = excluded.status,
        scanned_at = excluded.scanned_at,
        raw_ocr = excluded.raw_ocr`,L(t));}async remove(t){if(await this.init(),!this.isNative){this.webWrite(this.webRead().filter(i=>i.id!==t));return}await this.db.run("DELETE FROM entries WHERE id = ?",[t]);}webRead(){try{return JSON.parse(localStorage.getItem(w)??"[]").map(i=>m(l({},i),{variant:i.variant??"normal"}))}catch{return []}}webWrite(t){localStorage.setItem(w,JSON.stringify(t));}};n.\u0275fac=function(i){return new(i||n)},n.\u0275prov=q$1({token:n,factory:n.\u0275fac,providedIn:"root"});let e=n;return e})();function L(e){return [e.id,e.identity.game,e.identity.cardId,e.identity.language,e.identity.name,e.identity.setName,e.identity.setCode,e.identity.number,e.identity.imageUrl,e.identity.rarity,e.quantity,e.variant,e.price.amount,e.price.currency,e.price.source,e.price.updatedAt,e.status,e.scannedAt,e.rawOcr]}function I(e){return {id:e.id,identity:{game:e.game,cardId:e.card_id??null,language:e.language??null,name:e.name,setName:e.set_name??null,setCode:e.set_code??null,number:e.number??null,imageUrl:e.image_url??null,rarity:e.rarity??null},quantity:e.quantity??1,variant:e.variant??"normal",price:{amount:e.price_amount??null,currency:e.price_currency??"EUR",source:e.price_source??"none",updatedAt:e.price_updated_at??null},status:e.status??"identified",scannedAt:e.scanned_at,rawOcr:e.raw_ocr??null}}var q=(()=>{let n=class n{constructor(){this.db=w$1(N),this.registry=w$1(Je),this.entries=Re([]),this.loaded=Re(false),this.totalValue=Jn(()=>this.entries().reduce((t,i)=>t+(i.price.amount??0)*i.quantity,0)),this.totalCards=Jn(()=>this.entries().reduce((t,i)=>t+i.quantity,0));}async load(){this.loaded()||(this.entries.set(await this.db.getAll()),this.loaded.set(true));}async addFromScan(t$1,i,a,r="normal"){if(await this.load(),t$1.cardId){let u=this.entries().find(s=>s.identity.game===t$1.game&&s.identity.cardId===t$1.cardId&&s.variant===r);if(u){let s=m(l({},u),{quantity:u.quantity+1,price:i??u.price});return await this.save(s),s}}let T={id:t(),identity:t$1,variant:r,quantity:1,price:i??{amount:null,currency:"EUR",source:"none",updatedAt:null},status:t$1.cardId?"identified":"unverified",scannedAt:new Date().toISOString(),rawOcr:a};return await this.save(T),T}async addRaw(t){await this.save(t);}async update(t){await this.save(t);}async remove(t){await this.db.remove(t),this.entries.update(i=>i.filter(a=>a.id!==t));}async removeMany(t){let i=new Set(t);for(let a of i)await this.db.remove(a);this.entries.update(a=>a.filter(r=>!i.has(r.id)));}findDuplicate(t,i="normal"){return this.entries().find(a=>a.variant===i&&(t.cardId?a.identity.game===t.game&&a.identity.cardId===t.cardId:a.identity.game===t.game&&a.identity.name===t.name&&a.identity.setCode===t.setCode&&a.identity.number===t.number))}async refreshPrices(){let t=0;for(let i of this.entries()){if(!i.identity.cardId)continue;let a=this.registry.adapterFor(i.identity.game);if(a)try{let r=await a.fetchPrice(i.identity);r&&r.amount!=null&&(await this.save(m(l({},i),{price:r})),t++);}catch{}}return t}async save(t){await this.db.upsert(t),this.entries.update(i=>{let a=i.findIndex(r=>r.id===t.id);if(a>=0){let r=[...i];return r[a]=t,r}return [t,...i]});}};n.\u0275fac=function(i){return new(i||n)},n.\u0275prov=q$1({token:n,factory:n.\u0275fac,providedIn:"root"});let e=n;return e})();export{q};