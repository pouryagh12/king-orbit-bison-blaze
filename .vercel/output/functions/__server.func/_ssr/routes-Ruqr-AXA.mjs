import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Search, c as CircleDot, d as CalendarRange, i as Trash2, l as ChevronRight, n as UserRound, o as Plus, s as Minus, t as X, u as ChevronLeft } from "../_libs/lucide-react.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as Bar, c as Tooltip, i as ReferenceLine, n as YAxis, o as Cell, r as XAxis, s as ResponsiveContainer, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ruqr-AXA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function toFa(n, digits = 0) {
	return (digits === 0 ? Math.round(n) : Number(n.toFixed(digits))).toLocaleString("fa-IR", {
		maximumFractionDigits: digits,
		minimumFractionDigits: digits
	});
}
function parseLocaleNumber(raw) {
	const normalized = raw.trim().replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d))).replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/,/g, "").replace(/٫/g, ".");
	if (!normalized) return null;
	const n = Number(normalized);
	return Number.isFinite(n) ? n : null;
}
function normalizeSearch(s) {
	return s.replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\u064B-\u065F\u0670]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-accent/35 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface-2 text-ink hover:bg-line",
			outline: "border border-line bg-surface text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "text-ink hover:bg-surface-2",
			danger: "bg-danger text-accent-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11",
			pill: "h-9 rounded-full px-3.5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-subtle focus-visible:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/25", className),
		...props
	});
}
function dateKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseDateKey(key) {
	const [y, m, d] = key.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function shiftDateKey(key, days) {
	const d = parseDateKey(key);
	d.setDate(d.getDate() + days);
	return dateKey(d);
}
function formatDayLong(key) {
	return new Intl.DateTimeFormat("fa-IR", {
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(parseDateKey(key));
}
function formatWeekday(key) {
	return new Intl.DateTimeFormat("fa-IR", { weekday: "short" }).format(parseDateKey(key));
}
function isToday(key) {
	return key === dateKey();
}
function lastNDays(n, end = dateKey()) {
	return Array.from({ length: n }, (_, i) => shiftDateKey(end, i - (n - 1)));
}
function defaultMealForNow(d = /* @__PURE__ */ new Date()) {
	const h = d.getHours();
	if (h >= 5 && h < 11) return "breakfast";
	if (h >= 11 && h < 16) return "lunch";
	if (h >= 16 && h < 21) return "dinner";
	return "snack";
}
var CATEGORY_LABEL = {
	grain: "نان و غلات",
	rice: "برنج و خورشت",
	protein: "گوشت و پروتئین",
	dairy: "لبنیات",
	fruit: "میوه",
	veg: "سبزی و سالاد",
	drink: "نوشیدنی",
	snack: "تنقلات",
	breakfast: "صبحانه",
	fast: "فست‌فود"
};
function f(id, name, category, servingLabel, servingGrams, kcal, protein, carbs, fat, aliases = []) {
	return {
		id,
		name,
		category,
		servingLabel,
		servingGrams,
		kcal,
		protein,
		carbs,
		fat,
		aliases
	};
}
var FOODS = [
	f("sangak", "نان سنگک", "grain", "یک برش", 80, 260, 9, 52, 1.2, ["سنگک", "نان"]),
	f("barbari", "نان بربری", "grain", "یک برش", 90, 270, 8.5, 54, 1.5, ["بربری"]),
	f("lavash", "نان لواش", "grain", "یک برگ", 40, 275, 9, 56, 1.2, ["لواش"]),
	f("taftoon", "نان تافتون", "grain", "یک برگ", 60, 268, 8.8, 54, 1.4, ["تافتون"]),
	f("toast", "نان تست", "grain", "یک برش", 30, 265, 9, 49, 3.2, ["toast", "تست"]),
	f("rice", "برنج ایرانی پخته", "rice", "یک پیمانه", 150, 130, 2.7, 28, .3, [
		"چلو",
		"پلو",
		"rice"
	]),
	f("kateh", "کته", "rice", "یک پرس", 200, 135, 2.8, 29, .4, ["کته"]),
	f("zereshk", "زرشک‌پلو با مرغ", "rice", "یک پرس", 350, 165, 9, 20, 5, ["زرشک پلو"]),
	f("lubia", "لوبیاپلو", "rice", "یک پرس", 320, 170, 7, 24, 5.5, ["لوبیا پلو"]),
	f("baghali", "باقالی‌پلو با گوشت", "rice", "یک پرس", 350, 175, 9.5, 20, 6, ["باقالی پلو"]),
	f("tahchin", "ته‌چین مرغ", "rice", "یک پرس", 300, 190, 10, 22, 7, ["ته چین"]),
	f("adaspolo", "عدس‌پلو", "rice", "یک پرس", 300, 160, 6.5, 26, 3.5, ["عدس پلو"]),
	f("ghormeh", "قورمه سبزی", "rice", "یک کاسه", 220, 145, 10, 6, 8, ["قورمه", "خورشت"]),
	f("gheymeh", "خورشت قیمه", "rice", "یک کاسه", 220, 150, 9, 10, 8, ["قیمه"]),
	f("fesenjan", "فسنجان", "rice", "یک کاسه", 200, 240, 11, 8, 18, ["فسنجان"]),
	f("karafs", "خورشت کرفس", "rice", "یک کاسه", 200, 120, 9, 6, 6, ["کرفس"]),
	f("bademjan", "خورشت بادمجان", "rice", "یک کاسه", 220, 130, 6, 10, 7, ["خورشت بادمجان"]),
	f("abgoosht", "آبگوشت", "rice", "یک کاسه", 350, 110, 9, 8, 5, ["دیزی"]),
	f("ash", "آش رشته", "rice", "یک کاسه", 300, 95, 4.5, 14, 2.5, ["آش"]),
	f("koofteh", "کوفته تبریزی", "protein", "یک عدد", 180, 165, 11, 12, 8, ["کوفته"]),
	f("kotlet", "کتلت", "protein", "یک عدد", 80, 220, 12, 12, 13, ["کتلت"]),
	f("kookoo", "کوکو سبزی", "breakfast", "یک برش", 90, 185, 8, 8, 13, ["کوکو"]),
	f("kookoo-sib", "کوکو سیب‌زمینی", "breakfast", "یک برش", 90, 200, 6, 16, 12, []),
	f("mirza", "میرزاقاسمی", "veg", "یک پرس", 180, 120, 4, 8, 8, ["میرزا قاسمی"]),
	f("kashk", "کشک بادمجان", "veg", "یک پرس", 200, 140, 5, 10, 9, ["کشک"]),
	f("dolmeh", "دلمه برگ مو", "rice", "دو عدد", 120, 130, 4.5, 16, 5, ["دلمه"]),
	f("kebab-koobideh", "کباب کوبیده", "protein", "یک سیخ", 100, 240, 18, 2, 18, ["کوبیده", "کباب"]),
	f("kebab-barg", "کباب برگ", "protein", "یک سیخ", 110, 200, 22, 1, 12, ["برگ"]),
	f("joojeh", "جوجه کباب", "protein", "یک سیخ", 130, 165, 24, 1, 7, ["جوجه"]),
	f("chicken-breast", "سینه مرغ پخته", "protein", "یک سینه", 120, 165, 31, 0, 3.6, ["مرغ", "chicken"]),
	f("chicken-thigh", "ران مرغ پخته", "protein", "یک ران", 110, 210, 26, 0, 11, ["ران مرغ"]),
	f("beef", "گوشت گوساله پخته", "protein", "یک پرس", 100, 250, 26, 0, 15, ["گوشت"]),
	f("lamb", "گوشت گوسفند پخته", "protein", "یک پرس", 100, 270, 25, 0, 18, ["گوسفند"]),
	f("fish-grill", "ماهی کبابی", "protein", "یک فیله", 130, 150, 26, 0, 5, ["ماهی"]),
	f("salmon", "سالمون", "protein", "یک فیله", 120, 208, 20, 0, 13, ["salmon"]),
	f("tuna", "تن ماهی در روغن", "protein", "یک قوطی", 80, 198, 19, 0, 13, ["تن", "tuna"]),
	f("shrimp", "میگو پخته", "protein", "یک پرس", 100, 99, 24, .2, .3, ["میگو"]),
	f("egg", "تخم‌مرغ آب‌پز", "breakfast", "یک عدد", 50, 155, 13, 1.1, 11, ["تخم مرغ", "egg"]),
	f("omelette", "املت", "breakfast", "یک پرس", 150, 154, 10, 2, 12, ["املت"]),
	f("scramble", "نیمرو", "breakfast", "دو عدد", 100, 196, 13, 1, 15, ["نیمرو"]),
	f("adas", "عدسی", "breakfast", "یک کاسه", 250, 92, 6, 16, .4, ["عدس"]),
	f("lentils", "عدس پخته", "protein", "یک پیمانه", 150, 116, 9, 20, .4, []),
	f("chickpeas", "نخود پخته", "protein", "یک پیمانه", 150, 164, 8.9, 27, 2.6, ["نخود"]),
	f("beans", "لوبیا چیتی پخته", "protein", "یک پیمانه", 150, 127, 8.7, 23, .5, ["لوبیا"]),
	f("falafel", "فلافل", "protein", "دو عدد", 70, 333, 13, 32, 18, ["فلافل"]),
	f("hummus", "حمص", "protein", "دو قاشق", 50, 166, 8, 14, 10, ["حموس", "hummus"]),
	f("liver", "جگر مرغ", "protein", "یک پرس", 80, 167, 25, 1, 6.5, ["جگر"]),
	f("yogurt", "ماست کم‌چرب", "dairy", "یک کاسه", 150, 63, 5.3, 7, 1.6, ["ماست"]),
	f("yogurt-full", "ماست پرچرب", "dairy", "یک کاسه", 150, 96, 4.5, 5, 5, []),
	f("greek-yogurt", "ماست یونانی", "dairy", "یک کاسه", 150, 97, 9, 4, 5, ["یونانی"]),
	f("cheese-feta", "پنیر سفید", "dairy", "یک قوطی کوچک", 30, 264, 14, 4, 21, ["پنیر", "feta"]),
	f("cheese-pizza", "پنیر پیتزا", "dairy", "یک مشت", 30, 300, 22, 2.4, 22, ["موزارلا"]),
	f("milk-low", "شیر کم‌چرب", "dairy", "یک لیوان", 200, 46, 3.4, 5, 1, ["شیر"]),
	f("milk-full", "شیر پرچرب", "dairy", "یک لیوان", 200, 61, 3.2, 4.8, 3.3, []),
	f("dough", "دوغ", "drink", "یک لیوان", 250, 16, 1.5, 2, .3, ["دوغ"]),
	f("kashk-liquid", "کشک مایع", "dairy", "دو قاشق", 40, 110, 11, 6, 4, ["کشک"]),
	f("cream", "خامه", "dairy", "یک قاشق", 15, 340, 2, 3, 36, ["خامه"]),
	f("butter", "کره", "dairy", "یک قاشق", 10, 717, .9, .1, 81, ["کره"]),
	f("olive-oil", "روغن زیتون", "snack", "یک قاشق", 14, 884, 0, 0, 100, ["زیتون", "روغن"]),
	f("apple", "سیب", "fruit", "یک عدد", 180, 52, .3, 14, .2, ["apple"]),
	f("banana", "موز", "fruit", "یک عدد", 120, 89, 1.1, 23, .3, ["banana"]),
	f("orange", "پرتقال", "fruit", "یک عدد", 130, 47, .9, 12, .1, ["پرتقال"]),
	f("grape", "انگور", "fruit", "یک خوشه کوچک", 100, 69, .7, 18, .2, ["انگور"]),
	f("watermelon", "هندوانه", "fruit", "یک برش", 200, 30, .6, 8, .2, ["هندوانه"]),
	f("melon", "طالبی", "fruit", "یک برش", 150, 34, .8, 8, .2, ["طالبی"]),
	f("pomegranate", "انار", "fruit", "یک پیاله", 140, 83, 1.7, 19, 1.2, ["انار"]),
	f("date", "خرما", "fruit", "سه عدد", 24, 282, 2.5, 75, .4, ["خرما"]),
	f("raisin", "کشمش", "fruit", "یک مشت کوچک", 30, 299, 3.1, 79, .5, ["کشمش"]),
	f("strawberry", "توت‌فرنگی", "fruit", "یک پیاله", 120, 32, .7, 8, .3, ["توت"]),
	f("kiwi", "کیوی", "fruit", "یک عدد", 75, 61, 1.1, 15, .5, ["کیوی"]),
	f("pear", "گلابی", "fruit", "یک عدد", 160, 57, .4, 15, .1, ["گلابی"]),
	f("cucumber", "خیار", "veg", "یک عدد", 120, 15, .7, 3.6, .1, ["خیار"]),
	f("tomato", "گوجه فرنگی", "veg", "یک عدد", 120, 18, .9, 3.9, .2, ["گوجه"]),
	f("lettuce", "کاهو", "veg", "یک پیاله", 80, 15, 1.4, 2.9, .2, ["کاهو"]),
	f("spinach", "اسفناج پخته", "veg", "یک پیاله", 100, 23, 2.9, 3.6, .4, ["اسفناج"]),
	f("carrot", "هویج", "veg", "یک عدد", 60, 41, .9, 10, .2, ["هویج"]),
	f("broccoli", "بروکلی", "veg", "یک پیاله", 100, 34, 2.8, 7, .4, ["بروکلی"]),
	f("mushroom", "قارچ", "veg", "یک پیاله", 80, 22, 3.1, 3.3, .3, ["قارچ"]),
	f("eggplant", "بادمجان کبابی", "veg", "یک عدد", 150, 35, 1, 9, .2, ["بادمجان"]),
	f("pepper", "فلفل دلمه‌ای", "veg", "یک عدد", 120, 31, 1, 6, .3, ["فلفل"]),
	f("potato-boiled", "سیب‌زمینی آب‌پز", "veg", "یک عدد", 150, 87, 1.9, 20, .1, ["سیب زمینی"]),
	f("potato-fried", "سیب‌زمینی سرخ‌کرده", "fast", "یک پرس", 120, 312, 3.4, 41, 15, ["فرایز", "فرنچ فرایز"]),
	f("shirazi", "سالاد شیرازی", "veg", "یک کاسه", 150, 35, 1, 6, 1, ["شیرازی"]),
	f("olovieh", "سالاد الویه", "snack", "یک پرس", 150, 220, 8, 12, 15, ["الویه"]),
	f("season-salad", "سالاد فصل", "veg", "یک کاسه", 180, 40, 1.5, 7, 1, ["سالاد"]),
	f("olive", "زیتون", "veg", "ده عدد", 30, 115, .8, 6, 11, ["زیتون"]),
	f("pickle", "خیارشور", "veg", "چهار عدد", 50, 11, .3, 2.3, .2, ["شور"]),
	f("tea", "چای بدون شکر", "drink", "یک استکان", 200, 1, 0, .2, 0, ["چای", "tea"]),
	f("coffee-black", "قهوه سیاه", "drink", "یک فنجان", 180, 2, .3, 0, 0, ["قهوه", "coffee"]),
	f("coffee-milk", "قهوه با شیر", "drink", "یک فنجان", 200, 35, 2, 3, 1.5, ["لاته"]),
	f("espresso", "اسپرسو", "drink", "یک شات", 30, 3, .1, 0, 0, ["اسپرسو"]),
	f("cola", "نوشابه", "drink", "یک قوطی", 330, 42, 0, 10.6, 0, ["نوشابه", "کوکا"]),
	f("orange-juice", "آب پرتقال", "drink", "یک لیوان", 200, 45, .7, 10, .2, ["آبمیوه"]),
	f("doogh-gas", "دلستر", "drink", "یک بطری", 300, 18, .4, 4, 0, ["دلستر"]),
	f("water", "آب", "drink", "یک لیوان", 250, 0, 0, 0, 0, ["آب"]),
	f("walnut", "گردو", "snack", "چهار عدد", 20, 654, 15, 14, 65, ["گردو"]),
	f("almond", "بادام", "snack", "ده عدد", 15, 579, 21, 22, 50, ["بادام"]),
	f("pistachio", "پسته", "snack", "یک مشت کوچک", 20, 560, 20, 28, 45, ["پسته"]),
	f("sunflower", "تخمه آفتابگردان", "snack", "یک مشت", 30, 584, 21, 20, 51, ["تخمه"]),
	f("chips", "چیپس", "snack", "یک بسته کوچک", 30, 536, 7, 53, 35, ["چیپس"]),
	f("chocolate", "شکلات شیری", "snack", "دو مربع", 20, 535, 8, 59, 30, ["شکلات"]),
	f("ice-cream", "بستنی", "snack", "یک اسکوپ", 80, 207, 3.5, 24, 11, ["بستنی"]),
	f("cake", "کیک یزدی", "snack", "یک عدد", 50, 360, 6, 52, 14, ["کیک"]),
	f("biscuit", "بیسکویت", "snack", "دو عدد", 25, 460, 7, 70, 16, ["بیسکویت"]),
	f("honey", "عسل", "breakfast", "یک قاشق", 21, 304, .3, 82, 0, ["عسل"]),
	f("sugar", "شکر", "drink", "یک قاشق چایخوری", 4, 387, 0, 100, 0, ["شکر"]),
	f("peanut-butter", "کره بادام‌زمینی", "breakfast", "یک قاشق", 16, 588, 25, 20, 50, ["کره بادام"]),
	f("oats", "جو دوسر پخته", "breakfast", "یک کاسه", 200, 71, 2.5, 12, 1.5, [
		"جو",
		"اوتمیل",
		"oats"
	]),
	f("halim", "حلیم", "breakfast", "یک کاسه", 280, 110, 6, 16, 2.5, ["حلیم"]),
	f("kaleh", "کله‌پاچه (گوشت)", "protein", "یک پرس کوچک", 150, 230, 18, 0, 17, ["کله پاچه"]),
	f("sausage", "سوسیس", "fast", "دو عدد", 70, 301, 12, 2, 27, ["سوسیس"]),
	f("kalbas", "کالباس", "fast", "سه برش", 45, 260, 12, 4, 22, ["کالباس"]),
	f("pizza", "پیتزا مخلوط", "fast", "یک برش", 110, 266, 11, 33, 10, ["پیتزا", "pizza"]),
	f("burger", "همبرگر", "fast", "یک عدد", 180, 250, 15, 22, 12, ["همبرگر", "burger"]),
	f("sandwich-chicken", "ساندویچ مرغ", "fast", "یک عدد", 220, 220, 14, 22, 8, ["ساندویچ"]),
	f("pasta", "ماکارونی با سس", "fast", "یک پرس", 280, 150, 5, 22, 5, ["پاستا", "ماکارونی"]),
	f("steak", "استیک گوشت", "protein", "یک پرس", 150, 271, 25, 0, 19, ["استیک"]),
	f("whey", "پروتئین وی", "snack", "یک اسکوپ", 30, 400, 80, 8, 5, [
		"وی",
		"whey",
		"پروتئین"
	]),
	f("protein-bar", "پروتئین بار", "snack", "یک عدد", 60, 360, 25, 35, 12, ["بار"])
];
var FOOD_BY_ID = new Map(FOODS.map((food) => [food.id, food]));
function searchFoods(query) {
	const q = normalizeSearch(query);
	if (!q) return FOODS;
	return FOODS.filter((food) => {
		return normalizeSearch([
			food.name,
			food.id,
			...food.aliases
		].join(" ")).includes(q);
	});
}
var ACTIVITY_FACTOR = {
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	active: 1.725,
	very: 1.9
};
var ACTIVITY_LABEL = {
	sedentary: "کم‌تحرک",
	light: "کمی فعال",
	moderate: "متوسط",
	active: "فعال",
	very: "خیلی فعال"
};
var ACTIVITY_HINT = {
	sedentary: "کار نشسته، ورزش نادر",
	light: "هفته‌ای ۱ تا ۳ روز پیاده‌روی یا ورزش",
	moderate: "هفته‌ای ۳ تا ۵ روز ورزش",
	active: "تقریباً هر روز ورزش",
	very: "کار بدنی یا دو جلسه تمرین در روز"
};
var GOAL_LABEL = {
	lose: "کاهش وزن",
	maintain: "حفظ وزن",
	gain: "افزایش وزن"
};
function mifflinBmr(input) {
	const { sex, age, heightCm, weightKg } = input;
	const s = sex === "male" ? 5 : -161;
	return 10 * weightKg + 6.25 * heightCm - 5 * age + s;
}
function tdeeKcal(input) {
	return Math.round(mifflinBmr(input) * ACTIVITY_FACTOR[input.activity]);
}
function calorieGoalFromTdee(tdee, goal) {
	if (goal === "lose") return Math.max(1200, tdee - 500);
	if (goal === "gain") return tdee + 300;
	return tdee;
}
function macroGoals(kcal, weightKg) {
	const protein = Math.round(Math.min(weightKg * 1.8, kcal * .35 / 4));
	const fat = Math.round(Math.max(weightKg * .7, kcal * .25 / 9));
	return {
		protein,
		carbs: Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4)),
		fat
	};
}
function scaleMacros(per100, grams) {
	const k = grams / 100;
	return {
		kcal: Math.round(per100.kcal * k),
		protein: round1(per100.protein * k),
		carbs: round1(per100.carbs * k),
		fat: round1(per100.fat * k)
	};
}
function round1(n) {
	return Math.round(n * 10) / 10;
}
function sumMacros(items) {
	return items.reduce((acc, item) => ({
		kcal: acc.kcal + item.kcal,
		protein: round1(acc.protein + item.protein),
		carbs: round1(acc.carbs + item.carbs),
		fat: round1(acc.fat + item.fat)
	}), {
		kcal: 0,
		protein: 0,
		carbs: 0,
		fat: 0
	});
}
var DEFAULT_PROFILE = {
	name: "",
	sex: "female",
	age: 28,
	heightCm: 165,
	weightKg: 65,
	activity: "light",
	goal: "maintain",
	calorieGoal: 2e3,
	proteinGoal: 120,
	carbsGoal: 220,
	fatGoal: 65
};
function emptyDay(date) {
	return {
		date,
		entries: [],
		water: 0
	};
}
var storage = {
	getItem: (name) => {
		if (typeof window === "undefined") return null;
		const raw = window.localStorage.getItem(name);
		if (!raw) return null;
		try {
			return JSON.parse(raw);
		} catch {
			return null;
		}
	},
	setItem: (name, value) => {
		if (typeof window === "undefined") return;
		window.localStorage.setItem(name, JSON.stringify(value));
	},
	removeItem: (name) => {
		if (typeof window === "undefined") return;
		window.localStorage.removeItem(name);
	}
};
function ensureDay(days, date) {
	if (days[date]) return days;
	return {
		...days,
		[date]: emptyDay(date)
	};
}
var useCalorieStore = create()(persist((set, get) => ({
	hydrated: false,
	onboarded: false,
	profile: DEFAULT_PROFILE,
	days: {},
	selectedDate: dateKey(),
	recentFoodIds: [],
	setHydrated: () => set({ hydrated: true }),
	completeOnboarding: (profile) => set({
		onboarded: true,
		profile,
		selectedDate: dateKey()
	}),
	skipOnboarding: () => set({
		onboarded: true,
		selectedDate: dateKey()
	}),
	updateProfile: (patch) => set({ profile: {
		...get().profile,
		...patch
	} }),
	applyCalculatedGoal: () => {
		const profile = get().profile;
		const calorieGoal = calorieGoalFromTdee(tdeeKcal(profile), profile.goal);
		const macros = macroGoals(calorieGoal, profile.weightKg);
		set({ profile: {
			...profile,
			calorieGoal,
			...macros
		} });
	},
	setSelectedDate: (date) => set({ selectedDate: date }),
	addEntry: (entry) => {
		const date = get().selectedDate;
		const days = ensureDay(get().days, date);
		const next = {
			...entry,
			id: crypto.randomUUID(),
			createdAt: Date.now()
		};
		const log = days[date];
		set({
			recentFoodIds: entry.foodId ? [entry.foodId, ...get().recentFoodIds.filter((id) => id !== entry.foodId)].slice(0, 12) : get().recentFoodIds,
			days: {
				...days,
				[date]: {
					...log,
					entries: [next, ...log.entries]
				}
			}
		});
	},
	removeEntry: (id) => {
		const date = get().selectedDate;
		const log = get().days[date];
		if (!log) return;
		set({ days: {
			...get().days,
			[date]: {
				...log,
				entries: log.entries.filter((entry) => entry.id !== id)
			}
		} });
	},
	setWater: (glasses) => {
		const date = get().selectedDate;
		const days = ensureDay(get().days, date);
		const log = days[date];
		set({ days: {
			...days,
			[date]: {
				...log,
				water: Math.max(0, Math.min(12, glasses))
			}
		} });
	}
}), {
	name: "peymaneh-v1",
	storage,
	skipHydration: true,
	partialize: (state) => ({
		onboarded: state.onboarded,
		profile: state.profile,
		days: state.days,
		recentFoodIds: state.recentFoodIds
	})
}));
function useDayLog(date) {
	return useCalorieStore((s) => s.days[date] ?? emptyDay(date));
}
function entryFromFood(foodId, grams, meal) {
	const food = FOOD_BY_ID.get(foodId);
	if (!food) return null;
	const macros = scaleMacros(food, grams);
	return {
		foodId,
		name: food.name,
		meal,
		grams,
		...macros
	};
}
var MEALS$1 = [
	{
		id: "breakfast",
		label: "صبحانه"
	},
	{
		id: "lunch",
		label: "ناهار"
	},
	{
		id: "dinner",
		label: "شام"
	},
	{
		id: "snack",
		label: "میان‌وعده"
	}
];
var CATEGORIES = Object.keys(CATEGORY_LABEL);
function AddFoodSheet({ open, onOpenChange }) {
	const addEntry = useCalorieStore((s) => s.addEntry);
	const recentFoodIds = useCalorieStore((s) => s.recentFoodIds);
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [grams, setGrams] = (0, import_react.useState)(100);
	const [meal, setMeal] = (0, import_react.useState)(defaultMealForNow);
	const [customOpen, setCustomOpen] = (0, import_react.useState)(false);
	const results = (0, import_react.useMemo)(() => {
		const list = query ? searchFoods(query) : FOODS;
		if (category === "all") return list;
		return list.filter((food) => food.category === category);
	}, [category, query]);
	const recent = recentFoodIds.map((id) => FOOD_BY_ID.get(id)).filter((food) => Boolean(food));
	function reset() {
		setQuery("");
		setCategory("all");
		setPicked(null);
		setCustomOpen(false);
		setMeal(defaultMealForNow());
	}
	function pick(food) {
		setPicked(food);
		setGrams(food.servingGrams);
		setCustomOpen(false);
	}
	function confirm() {
		if (!picked) return;
		const entry = entryFromFood(picked.id, grams, meal);
		if (!entry) return;
		addEntry(entry);
		reset();
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange: (next) => {
			if (!next) reset();
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-40 bg-ink/35" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: "drawer-panel fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-xl bg-bg outline-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1.5 w-12 rounded-full bg-line" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 pb-2 pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
						className: "text-base font-semibold",
						children: picked ? picked.name : customOpen ? "غذای دلخواه" : "افزودن غذا"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-ink",
						onClick: () => onOpenChange(false),
						"aria-label": "بستن",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				picked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodDetail, {
					food: picked,
					grams,
					meal,
					onGrams: setGrams,
					onMeal: setMeal,
					onBack: () => setPicked(null),
					onConfirm: confirm
				}) : customOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomFood, {
					meal,
					onMeal: setMeal,
					onBack: () => setCustomOpen(false),
					onSave: (entry) => {
						addEntry(entry);
						reset();
						onOpenChange(false);
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "جستجوی غذا، مثلاً سنگک یا مرغ",
								className: "pr-10",
								autoFocus: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2 overflow-x-auto pb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: category === "all",
								onClick: () => setCategory("all"),
								children: "همه"
							}), CATEGORIES.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: category === key,
								onClick: () => setCategory(key),
								children: CATEGORY_LABEL[key]
							}, key))]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 min-h-0 flex-1 overflow-y-auto px-5 pb-8",
						children: [
							!query && recent.length > 0 && category === "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-2 text-xs font-medium text-muted",
									children: "اخیراً"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: recent.map((food) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => pick(food),
										className: "rounded-full bg-surface-2 px-3 py-2 text-sm text-ink transition-colors duration-150 hover:bg-line",
										children: food.name
									}, food.id))
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setCustomOpen(true),
								className: "mb-3 w-full rounded-lg bg-surface px-4 py-3 text-right text-sm shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
								children: "غذا در فهرست نبود؟ ثبت کالری دلخواه"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-1.5",
								children: [results.map((food) => {
									const macros = scaleMacros(food, food.servingGrams);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => pick(food),
										className: "flex w-full items-center justify-between gap-3 rounded-lg bg-surface px-3 py-3 text-right shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm font-medium",
											children: food.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-xs text-muted",
											children: [
												food.servingLabel,
												" · ",
												toFa(food.servingGrams),
												" گرم"
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums text-sm font-medium text-accent",
											children: toFa(macros.kcal)
										})]
									}) }, food.id);
								}), results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "py-10 text-center text-sm text-muted",
									children: "چیزی پیدا نشد. می‌توانی کالری را دستی وارد کنی."
								}) : null]
							})
						]
					})]
				})
			]
		})] })
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-colors duration-150 ${active ? "bg-accent text-accent-fg" : "bg-surface-2 text-ink"}`,
		children
	});
}
function FoodDetail({ food, grams, meal, onGrams, onMeal, onBack, onConfirm }) {
	const macros = scaleMacros(food, grams);
	const servings = food.servingGrams > 0 ? grams / food.servingGrams : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col px-5 pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onBack,
				className: "self-start text-sm text-muted hover:text-ink",
				children: "بازگشت به فهرست"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					food.servingLabel,
					" ≈ ",
					toFa(food.servingGrams),
					" گرم"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted",
						children: "کالری این وعده"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-center font-semibold tabular-nums text-3xl",
						children: toFa(macros.kcal)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-3 gap-2 text-center text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacroStat, {
								label: "پروتئین",
								value: macros.protein
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacroStat, {
								label: "کربوهیدرات",
								value: macros.carbs
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacroStat, {
								label: "چربی",
								value: macros.fat
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center justify-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-full bg-surface-2",
						onClick: () => onGrams(Math.max(5, grams - 10)),
						"aria-label": "کاهش مقدار",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-28 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-semibold tabular-nums text-xl",
							children: [toFa(grams), " گرم"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								toFa(servings, 1),
								" × ",
								food.servingLabel
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-full bg-surface-2",
						onClick: () => onGrams(grams + 10),
						"aria-label": "افزایش مقدار",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex justify-center gap-2",
				children: [
					.5,
					1,
					2
				].map((mult) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onGrams(Math.round(food.servingGrams * mult)),
					className: "h-9 rounded-full bg-surface-2 px-3 text-sm",
					children: mult === .5 ? "نیم پرس" : mult === 1 ? "یک پرس" : "دو پرس"
				}, mult))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 mb-2 text-sm font-medium",
				children: "وعده"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1 rounded-lg bg-surface-2 p-1",
				children: MEALS$1.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onMeal(item.id),
					className: `h-9 rounded-md text-xs font-medium ${meal === item.id ? "bg-surface text-ink shadow-[var(--shadow-border)]" : "text-muted"}`,
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-auto w-full",
				size: "lg",
				onClick: onConfirm,
				children: "افزودن به روز"
			})
		]
	});
}
function MacroStat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "tabular-nums font-medium text-ink",
		children: [toFa(value, 1), " گ"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: label })] });
}
function CustomFood({ meal, onMeal, onBack, onSave }) {
	const [name, setName] = (0, import_react.useState)("");
	const [kcal, setKcal] = (0, import_react.useState)("");
	const [protein, setProtein] = (0, import_react.useState)("0");
	const [carbs, setCarbs] = (0, import_react.useState)("0");
	const [fat, setFat] = (0, import_react.useState)("0");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-6",
		onSubmit: (e) => {
			e.preventDefault();
			const kcalN = Number(kcal);
			if (!name.trim() || !Number.isFinite(kcalN) || kcalN < 0) return;
			onSave({
				name: name.trim(),
				meal,
				grams: 100,
				kcal: Math.round(kcalN),
				protein: Number(protein) || 0,
				carbs: Number(carbs) || 0,
				fat: Number(fat) || 0
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onBack,
				className: "self-start text-sm text-muted hover:text-ink",
				children: "بازگشت"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: name,
				onChange: (e) => setName(e.target.value),
				placeholder: "نام غذا",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: kcal,
				onChange: (e) => setKcal(e.target.value),
				inputMode: "numeric",
				placeholder: "کالری",
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: protein,
						onChange: (e) => setProtein(e.target.value),
						inputMode: "decimal",
						placeholder: "پروتئین"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: carbs,
						onChange: (e) => setCarbs(e.target.value),
						inputMode: "decimal",
						placeholder: "کربوهیدرات"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: fat,
						onChange: (e) => setFat(e.target.value),
						inputMode: "decimal",
						placeholder: "چربی"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1 rounded-lg bg-surface-2 p-1",
				children: MEALS$1.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onMeal(item.id),
					className: `h-9 rounded-md text-xs font-medium ${meal === item.id ? "bg-surface text-ink shadow-[var(--shadow-border)]" : "text-muted"}`,
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-auto w-full",
				size: "lg",
				type: "submit",
				children: "ثبت"
			})
		]
	});
}
function HistoryView({ onOpenDay }) {
	const days = useCalorieStore((s) => s.days);
	const profile = useCalorieStore((s) => s.profile);
	const setSelectedDate = useCalorieStore((s) => s.setSelectedDate);
	const keys = lastNDays(7);
	const rows = (0, import_react.useMemo)(() => keys.map((key) => {
		const totals = sumMacros(days[key]?.entries ?? []);
		return {
			key,
			label: formatWeekday(key),
			kcal: totals.kcal,
			protein: totals.protein
		};
	}), [days, keys]);
	const avg = Math.round(rows.reduce((sum, row) => sum + row.kcal, 0) / rows.length);
	const onTarget = rows.filter((row) => {
		if (row.kcal === 0) return false;
		return Math.abs(row.kcal - profile.calorieGoal) / profile.calorieGoal <= .1;
	}).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "هفت روز اخیر"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					"میانگین ",
					toFa(avg),
					" کالری · ",
					toFa(onTarget),
					" روز نزدیک به هدف"
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-52",
					dir: "ltr",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: rows,
							barCategoryGap: "28%",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "label",
									axisLine: false,
									tickLine: false,
									tick: {
										fill: "var(--color-muted)",
										fontSize: 12
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									cursor: { fill: "color-mix(in oklab, var(--color-ink) 4%, transparent)" },
									content: ({ active, payload }) => {
										if (!active || !payload?.[0]) return null;
										const row = payload[0].payload;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-md bg-ink px-3 py-2 text-xs text-accent-fg",
											children: [toFa(row.kcal), " کالری"]
										});
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
									y: profile.calorieGoal,
									stroke: "var(--color-accent)",
									strokeDasharray: "4 4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "kcal",
									radius: [
										6,
										6,
										2,
										2
									],
									children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: row.kcal === 0 ? "var(--color-line)" : row.kcal > profile.calorieGoal ? "var(--color-danger)" : "var(--color-accent)" }, row.key))
								})
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-xs text-muted",
					children: "خط‌چین، هدف روزانه است"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: [...rows].reverse().map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setSelectedDate(row.key);
						onOpenDay();
					},
					className: "flex w-full items-center justify-between rounded-lg bg-surface px-4 py-3 text-right shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted",
						children: row.kcal ? `پروتئین ${toFa(Math.round(row.protein))} گرم` : "بدون ثبت"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-sm font-medium",
						children: row.kcal ? toFa(row.kcal) : "—"
					})]
				}) }, row.key))
			})
		]
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-ink", className),
		...props
	});
}
var ACTIVITIES$1 = [
	"sedentary",
	"light",
	"moderate",
	"active",
	"very"
];
function Onboarding() {
	const completeOnboarding = useCalorieStore((s) => s.completeOnboarding);
	const skipOnboarding = useCalorieStore((s) => s.skipOnboarding);
	const [step, setStep] = (0, import_react.useState)("welcome");
	const [sex, setSex] = (0, import_react.useState)("female");
	const [goal, setGoal] = (0, import_react.useState)("maintain");
	const [activity, setActivity] = (0, import_react.useState)("light");
	const [age, setAge] = (0, import_react.useState)("28");
	const [height, setHeight] = (0, import_react.useState)("165");
	const [weight, setWeight] = (0, import_react.useState)("65");
	const [name, setName] = (0, import_react.useState)("");
	const preview = (0, import_react.useMemo)(() => {
		const ageN = parseLocaleNumber(age) ?? 28;
		const heightN = parseLocaleNumber(height) ?? 165;
		const weightN = parseLocaleNumber(weight) ?? 65;
		const tdee = tdeeKcal({
			sex,
			age: ageN,
			heightCm: heightN,
			weightKg: weightN,
			activity
		});
		const calorieGoal = calorieGoalFromTdee(tdee, goal);
		return {
			tdee,
			calorieGoal,
			macros: macroGoals(calorieGoal, weightN)
		};
	}, [
		activity,
		age,
		goal,
		height,
		sex,
		weight
	]);
	function submit() {
		const ageN = parseLocaleNumber(age) ?? 28;
		const heightN = parseLocaleNumber(height) ?? 165;
		const weightN = parseLocaleNumber(weight) ?? 65;
		completeOnboarding({
			...DEFAULT_PROFILE,
			name: name.trim(),
			sex,
			age: ageN,
			heightCm: heightN,
			weightKg: weightN,
			activity,
			goal,
			calorieGoal: preview.calorieGoal,
			...preview.macros
		});
	}
	if (step === "welcome") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-md flex-col justify-between px-6 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in space-y-5 pt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-accent",
					children: "پیمانه"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-4xl font-semibold leading-tight tracking-tight text-ink",
					children: [
						"کالری روز را",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"آرام بشمار"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-base text-muted",
					children: "غذاهایت را ثبت کن، هدف روزانه بگذار و ببین چقدر تا پایان روز مانده. همه چیز روی همین دستگاه ذخیره می‌شود."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in space-y-3 pb-[env(safe-area-inset-bottom)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				size: "lg",
				onClick: () => setStep("form"),
				children: "محاسبه هدف من"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "w-full",
				size: "lg",
				variant: "secondary",
				onClick: skipOnboarding,
				children: [
					"شروع با ",
					toFa(2e3),
					" کالری"
				]
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-dvh max-w-md px-6 py-8 pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setStep("welcome"),
				className: "text-sm text-muted transition-opacity duration-150 hover:text-ink",
				children: "بازگشت"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-2xl font-semibold tracking-tight",
				children: "هدف روزانه"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "با فرمول میفلین، کالری نگهداری محاسبه می‌شود."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "نام (اختیاری)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "مثلاً سارا",
							autoComplete: "name"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "جنسیت",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment$1, {
							value: sex,
							onChange: setSex,
							options: [{
								value: "female",
								label: "زن"
							}, {
								value: "male",
								label: "مرد"
							}]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
								label: "سن",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "numeric",
									value: age,
									onChange: (e) => setAge(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
								label: "قد (سانتی‌متر)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: height,
									onChange: (e) => setHeight(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
								label: "وزن (کیلو)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: weight,
									onChange: (e) => setWeight(e.target.value)
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
						label: "هدف",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment$1, {
							value: goal,
							onChange: setGoal,
							options: Object.keys(GOAL_LABEL).map((key) => ({
								value: key,
								label: GOAL_LABEL[key]
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-medium",
						children: "فعالیت روزانه"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: ACTIVITIES$1.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActivity(key),
							className: `rounded-lg px-3 py-3 text-right shadow-[var(--shadow-border)] transition-[background-color,box-shadow] duration-150 ${activity === key ? "bg-accent text-accent-fg" : "bg-surface text-ink hover:shadow-[var(--shadow-border-hover)]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: ACTIVITY_LABEL[key]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `block text-xs ${activity === key ? "text-accent-fg/80" : "text-muted"}`,
								children: ACTIVITY_HINT[key]
							})]
						}, key))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 border-t border-line bg-surface/95 px-6 py-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-md items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "هدف پیشنهادی"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold tabular-nums text-lg",
						children: [toFa(preview.calorieGoal), " کالری"]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: submit,
						children: "شروع"
					})]
				})
			})
		]
	});
}
function Field$1({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function Segment$1({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid auto-cols-fr grid-flow-col gap-1 rounded-lg bg-surface-2 p-1",
		children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(opt.value),
			className: `h-9 rounded-md px-2 text-sm font-medium transition-[background-color,color] duration-150 ${value === opt.value ? "bg-surface text-ink shadow-[var(--shadow-border)]" : "text-muted hover:text-ink"}`,
			children: opt.label
		}, opt.value))
	});
}
var ACTIVITIES = [
	"sedentary",
	"light",
	"moderate",
	"active",
	"very"
];
function ProfileView() {
	const profile = useCalorieStore((s) => s.profile);
	const updateProfile = useCalorieStore((s) => s.updateProfile);
	const applyCalculatedGoal = useCalorieStore((s) => s.applyCalculatedGoal);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const tdee = tdeeKcal(profile);
	function setNum(key, raw) {
		const n = parseLocaleNumber(raw);
		if (n === null) return;
		updateProfile({ [key]: n });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "هدف و مشخصات"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					"کالری نگهداری حدود ",
					toFa(tdee),
					" است. هدف فعلی",
					" ",
					toFa(profile.calorieGoal),
					" کالری."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "نام",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: profile.name,
							onChange: (e) => updateProfile({ name: e.target.value }),
							placeholder: "اختیاری"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1.5 text-sm font-medium",
						children: "جنسیت"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
						value: profile.sex,
						onChange: (sex) => updateProfile({ sex }),
						options: [{
							value: "female",
							label: "زن"
						}, {
							value: "male",
							label: "مرد"
						}]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "سن",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "numeric",
									defaultValue: String(profile.age),
									onBlur: (e) => setNum("age", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "قد",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									defaultValue: String(profile.heightCm),
									onBlur: (e) => setNum("heightCm", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "وزن",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									defaultValue: String(profile.weightKg),
									onBlur: (e) => setNum("weightKg", e.target.value)
								})
							})
						]
					}, `body-${profile.age}-${profile.heightCm}-${profile.weightKg}`),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1.5 text-sm font-medium",
						children: "هدف"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
						value: profile.goal,
						onChange: (goal) => updateProfile({ goal }),
						options: Object.keys(GOAL_LABEL).map((key) => ({
							value: key,
							label: GOAL_LABEL[key]
						}))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1.5 text-sm font-medium",
						children: "فعالیت"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: ACTIVITIES.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => updateProfile({ activity: key }),
							className: `h-9 rounded-full px-3 text-sm ${profile.activity === key ? "bg-accent text-accent-fg" : "bg-surface-2 text-ink"}`,
							children: ACTIVITY_LABEL[key]
						}, key))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => {
							applyCalculatedGoal();
							setSaved(true);
							window.setTimeout(() => setSaved(false), 1600);
						},
						children: saved ? "هدف به‌روز شد" : "محاسبه دوباره هدف"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "تنظیم دستی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "کالری روزانه",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "numeric",
							defaultValue: String(profile.calorieGoal),
							onBlur: (e) => setNum("calorieGoal", e.target.value)
						}, profile.calorieGoal)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "پروتئین (گ)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "numeric",
									defaultValue: String(profile.proteinGoal),
									onBlur: (e) => setNum("proteinGoal", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "کربوهیدرات",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "numeric",
									defaultValue: String(profile.carbsGoal),
									onBlur: (e) => setNum("carbsGoal", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "چربی",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "numeric",
									defaultValue: String(profile.fatGoal),
									onBlur: (e) => setNum("fatGoal", e.target.value)
								})
							})
						]
					}, `macro-${profile.proteinGoal}-${profile.carbsGoal}-${profile.fatGoal}`)
				]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function Segment({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid auto-cols-fr grid-flow-col gap-1 rounded-lg bg-surface-2 p-1",
		children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(opt.value),
			className: `h-9 rounded-md px-2 text-sm font-medium transition-[background-color,color] duration-150 ${value === opt.value ? "bg-surface text-ink shadow-[var(--shadow-border)]" : "text-muted hover:text-ink"}`,
			children: opt.label
		}, opt.value))
	});
}
function CalorieRing({ consumed, goal }) {
	const remaining = goal - consumed;
	const ratio = goal > 0 ? Math.min(consumed / goal, 1) : 0;
	const over = remaining < 0;
	const size = 220;
	const stroke = 14;
	const r = 103;
	const c = 2 * Math.PI * r;
	const dash = c * ratio;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto grid place-items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			viewBox: `0 0 ${size} ${size}`,
			className: "overflow-visible",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "currentColor",
				className: "text-ring-track",
				strokeWidth: stroke
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "currentColor",
				className: over ? "text-danger" : "text-accent",
				strokeWidth: stroke,
				strokeLinecap: "round",
				strokeDasharray: `${dash} ${c}`,
				transform: `rotate(-90 ${size / 2} ${size / 2})`,
				style: { transition: "stroke-dasharray 400ms cubic-bezier(0.22, 1, 0.36, 1)" }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-muted",
					children: over ? "بیش از هدف" : "باقی‌مانده"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-semibold tabular-nums text-4xl leading-none tracking-tight text-ink",
					children: toFa(Math.abs(remaining))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"از ",
						toFa(goal),
						" کالری"
					]
				})
			]
		})]
	});
}
var MEALS = [
	{
		id: "breakfast",
		label: "صبحانه"
	},
	{
		id: "lunch",
		label: "ناهار"
	},
	{
		id: "dinner",
		label: "شام"
	},
	{
		id: "snack",
		label: "میان‌وعده"
	}
];
var WATER_GOAL = 8;
function TodayView({ onAdd }) {
	const selectedDate = useCalorieStore((s) => s.selectedDate);
	const setSelectedDate = useCalorieStore((s) => s.setSelectedDate);
	const profile = useCalorieStore((s) => s.profile);
	const removeEntry = useCalorieStore((s) => s.removeEntry);
	const setWater = useCalorieStore((s) => s.setWater);
	const log = useDayLog(selectedDate);
	const totals = sumMacros(log.entries);
	const remaining = profile.calorieGoal - totals.kcal;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-ink",
						onClick: () => setSelectedDate(shiftDateKey(selectedDate, -1)),
						"aria-label": "روز قبل",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-ink",
							children: isToday(selectedDate) ? "امروز" : formatDayLong(selectedDate)
						}), isToday(selectedDate) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: formatDayLong(selectedDate)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-accent",
							onClick: () => setSelectedDate(dateKey()),
							children: "بازگشت به امروز"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-ink disabled:opacity-30",
						onClick: () => setSelectedDate(shiftDateKey(selectedDate, 1)),
						"aria-label": "روز بعد",
						disabled: isToday(selectedDate),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalorieRing, {
				consumed: totals.kcal,
				goal: profile.calorieGoal
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted",
				children: remaining >= 0 ? `${toFa(totals.kcal)} کالری خورده شده` : `${toFa(Math.abs(remaining))} کالری بیش از هدف`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacroCard, {
						label: "پروتئین",
						value: totals.protein,
						goal: profile.proteinGoal
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacroCard, {
						label: "کربوهیدرات",
						value: totals.carbs,
						goal: profile.carbsGoal
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacroCard, {
						label: "چربی",
						value: totals.fat,
						goal: profile.fatGoal
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "آب"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tabular-nums text-muted",
						children: [
							toFa(log.water),
							" از ",
							toFa(WATER_GOAL),
							" لیوان"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: Array.from({ length: WATER_GOAL }, (_, i) => {
						const filled = i < log.water;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `لیوان ${toFa(i + 1)}`,
							onClick: () => setWater(filled && i === log.water - 1 ? i : i + 1),
							className: `h-9 w-9 rounded-md transition-colors duration-150 ${filled ? "bg-accent" : "bg-surface-2"}`
						}, i);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: MEALS.map((meal) => {
					const items = log.entries.filter((entry) => entry.meal === meal.id);
					const mealSum = sumMacros(items);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: meal.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tabular-nums text-muted",
							children: items.length ? `${toFa(mealSum.kcal)} کالری` : "خالی"
						})]
					}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-lg bg-surface px-3 py-4 text-sm text-muted shadow-[var(--shadow-border)]",
						children: "هنوز غذایی ثبت نشده"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1.5",
						children: items.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: entry.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs tabular-nums text-muted",
										children: [
											toFa(entry.grams),
											" گرم · پروتئین",
											" ",
											toFa(entry.protein, 1)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tabular-nums text-sm font-medium",
									children: toFa(entry.kcal)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `حذف ${entry.name}`,
									onClick: () => removeEntry(entry.id),
									className: "grid size-11 place-items-center rounded-md text-subtle hover:bg-surface-2 hover:text-danger",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							]
						}, entry.id))
					})] }, meal.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "w-full",
				size: "lg",
				onClick: onAdd,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "افزودن غذا"]
			})
		]
	});
}
function MacroCard({ label, value, goal }) {
	const ratio = goal > 0 ? Math.min(value / goal, 1) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface p-3 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-semibold tabular-nums",
				children: [toFa(Math.round(value)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mr-1 text-xs font-normal text-muted",
					children: [
						"/ ",
						toFa(goal),
						"گ"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-accent transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
					style: { width: `${ratio * 100}%` }
				})
			})
		]
	});
}
function Home() {
	const hydrated = useCalorieStore((s) => s.hydrated);
	const onboarded = useCalorieStore((s) => s.onboarded);
	const setHydrated = useCalorieStore((s) => s.setHydrated);
	const setSelectedDate = useCalorieStore((s) => s.setSelectedDate);
	const [tab, setTab] = (0, import_react.useState)("today");
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const finish = () => {
			setSelectedDate(dateKey());
			setHydrated();
		};
		const persistApi = useCalorieStore.persist;
		if (!persistApi) {
			finish();
			return;
		}
		const unsub = persistApi.onFinishHydration(finish);
		try {
			Promise.resolve(persistApi.rehydrate()).then(finish, finish);
		} catch {
			finish();
		}
		const timeout = window.setTimeout(finish, 80);
		return () => {
			unsub();
			window.clearTimeout(timeout);
		};
	}, [setHydrated, setSelectedDate]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto flex min-h-dvh max-w-lg items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "در حال آماده‌سازی پیمانه…"
		})
	});
	if (!onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-lg px-5 pb-28 pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 flex items-baseline justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-accent",
							children: "پیمانه"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-semibold",
							children: tab === "today" ? "دفتر امروز" : tab === "history" ? "مرور هفته" : "تنظیمات"
						})] })
					}),
					tab === "today" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayView, { onAdd: () => setAddOpen(true) }) : null,
					tab === "history" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryView, { onOpenDay: () => setTab("today") }) : null,
					tab === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileView, {}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-lg grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
							active: tab === "today",
							label: "امروز",
							onClick: () => setTab("today"),
							icon: CircleDot
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
							active: tab === "history",
							label: "هفته",
							onClick: () => setTab("history"),
							icon: CalendarRange
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
							active: tab === "profile",
							label: "هدف",
							onClick: () => setTab("profile"),
							icon: UserRound
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFoodSheet, {
				open: addOpen,
				onOpenChange: setAddOpen
			})
		]
	});
}
function NavBtn({ active, label, onClick, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex h-14 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors duration-150", active ? "text-accent" : "text-muted hover:text-ink"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-5",
			strokeWidth: active ? 2.2 : 1.8
		}), label]
	});
}
//#endregion
export { Home as component };
