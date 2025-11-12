import { ServiceCategory, Product } from './types';

export const laserServices: ServiceCategory[] = [
  {
    title: 'Лицо',
    items: [
      { name: 'Верхняя губа', price: '500р' },
      { name: 'Подбородок', price: '500р' },
      { name: 'Межбровье', price: '400р' },
      { name: 'Бакенбарды', price: '500р' },
      { name: 'Щеки', price: '700р' },
      { name: 'Всё лицо полностью', price: '1500р' },
    ],
  },
  {
    title: 'Тело',
    items: [
      { name: 'Подмышечные впадины', price: '800р' },
      { name: 'Бикини (классика, по линии белья)', price: '1000р' },
      { name: 'Бикини (глубокое)', price: '1800р' },
      { name: 'Белая линия живота', price: '500р' },
      { name: 'Живот полностью', price: '900р' },
      { name: 'Ягодицы', price: '900р' },
      { name: 'Грудь полностью', price: '900р' },
      { name: 'Ареолы', price: '500р' },
      { name: 'Поясница', price: '900р' },
      { name: 'Спина полностью', price: '1900р' },
      { name: 'Шея полностью', price: '1500р' },
    ],
  },
  {
    title: 'Руки',
    items: [
      { name: 'Руки до локтя', price: '1100р' },
      { name: 'Руки выше локтя', price: '1100р' },
      { name: 'Кисти рук (с пальцами)', price: '500р' },
      { name: 'Руки полностью', price: '1600р' },
    ],
  },
  {
    title: 'Ноги',
    items: [
      { name: 'Голени (с коленями)', price: '1600р' },
      { name: 'Бёдра', price: '1800р' },
      { name: 'Стопы (с пальцами)', price: '500р' },
      { name: 'Ноги полностью', price: '2500р' },
      { name: 'Все тело', price: '6500р' },
    ],
  },
];

export const cosmetologyServices: ServiceCategory[] = [
    {
        title: 'Уходовые процедуры',
        items: [
            { name: 'Массаж лица', price: '3000р', duration: '70 мин' },
            { name: 'Массажный уход с маской', price: '4000р', duration: '100 мин' },
            { name: 'Экспресс-уход "Голливудское сияние"', price: '3500р', duration: '70 мин' },
            { name: 'SPA-уход "Тотальное Преображение"', price: '5000р', duration: '120 мин' },
        ]
    },
    {
        title: 'Чистки',
        items: [
            { name: 'Экспресс-чистка', price: '3000р', duration: '70 мин' },
            { name: 'Глубокая чистка', price: '4500р', duration: '90-120 мин' },
        ]
    },
    {
        title: 'Аппаратная косметология',
        items: [
            { name: 'Лазерная биоревитализация и омоложение', price: '3000р', duration: '60 мин' },
        ]
    }
];

export const productsData: Product[] = [
    {
        id: 'nmf_foam',
        name: 'N.M.F. Hydrating Foam',
        category: 'N.M.F. Hydrating',
        prices: [{ size: '200 мл', price: '3 400 р.' }, { size: '50 мл', price: '1 430 р.', tag: 'travel+' }],
        description: 'Бессульфатная пенка на основе мягких ПАВ эффективно очищает кожу от загрязнений, удаляет макияж, подготавливает кожу к нанесению остальных средств серии N.M.F Hydrating.',
        activeComponents: ['Молочная кислота', 'Глюконолактон', 'Мочевина', 'Пантенол'],
        releaseForm: 'Флакон с пенообразователем'
    },
    {
        id: 'nmf_toner',
        name: 'N.M.F. Hydrating Toner',
        category: 'N.M.F. Hydrating',
        prices: [{ size: '300 мл', price: '3 320 р.' }],
        description: 'Синергия полигидроксикислот, сквалана, аллантоина с натуральным увлажняющим фактором тонизирует, смягчает и увлажняет сухую кожу после умывания.',
        activeComponents: ['Глюконолактон', 'Лактобионовая кислота', 'Аллантоин', 'Пантенол'],
        releaseForm: 'Флакон с дозатором'
    },
    {
        id: 'nmf_cream_serum',
        name: 'N.M.F. Hydrating Cream-Serum',
        category: 'N.M.F. Hydrating',
        prices: [{ size: '30 мл', price: '3 480 р.' }],
        description: 'Церамиды и холестерол в синергии с трегалозой и маслом макадамии дают эффект выраженного и пролонгированного увлажнения.',
        activeComponents: ['Сквалан', 'Холестерол', 'Масло макадамии', 'Церамиды'],
        releaseForm: 'Флакон с дозатором'
    },
    {
        id: 'nmf_cream',
        name: 'N.M.F. Hydrating Cream',
        category: 'N.M.F. Hydrating',
        prices: [{ size: '50 мл', price: '3 300 р.' }],
        description: 'Крем с компонентами натурального увлажняющего фактора и плотной текстурой для восстановления защитных функций и интенсивного увлажнения сухой и обезвоженной кожи.',
        activeComponents: ['Церамиды', 'Фосфолипиды', 'Сквалан', 'Масло ши'],
        releaseForm: 'Флакон с дозатором'
    },
    {
        id: 'corneo_foam',
        name: 'Corneotherapy Foam',
        category: 'Corneotherapy',
        prices: [{ size: '200 мл', price: '3 340 р.' }, { size: '50 мл', price: '1 400 р.', tag: 'travel+' }],
        description: 'Пенка для корнеотерапии на основе сверхмягкого ПАВ нового поколения специально создана для эффективного очищения кожи, восстановления и сохранения эпидермального барьера.',
        activeComponents: ['Кокоил глутамат', 'Мальва экстракт', 'Пантенол', 'Глицин'],
        releaseForm: 'Флакон с пенообразователем'
    },
    {
        id: '3_lipid_cream',
        name: '3-Lipid Lamellar Cream',
        category: 'Corneotherapy',
        prices: [{ size: '50 мл', price: '3 720 р.' }, { size: '150 мл', price: '7 900 р.' }],
        description: 'Уникальная синергия трёх типов липидов: холестерола, церамидов и омега 3, 6, 9 жирных кислот (2%) – идеально подходит для построения липидного барьера.',
        activeComponents: ['Омега 3-6-9 жирные кислоты', 'Церамид NS', 'Холестерол', 'Масло чиа'],
        releaseForm: 'Флакон с вакуумным диспенсером'
    },
    {
        id: 'azelaic_foam',
        name: 'Azelaic 2-Function Foam',
        category: 'Azelaic',
        prices: [{ size: '200 мл', price: '3 540 р.' }, { size: '50 мл', price: '1 500 р.', tag: 'travel+' }],
        description: 'Бессульфатная пенка на основе мягких ПАВ с азелаиновой, койевой, фитиновой кислотами и арбутином. Способствует устранению признаков старения и выравнивает тон кожи.',
        activeComponents: ['Азелаиновая кислота', 'Койевая кислота', 'Аргинин', 'Пантенол'],
        releaseForm: 'Флакон с пенообразователем'
    },
    {
        id: 'azelaic_cream_2',
        name: 'Azelaic 2-Function Cream 2%',
        category: 'Azelaic',
        prices: [{ size: '50 мл', price: '3 670 р.' }],
        description: 'Синергия азелоглицина, койевой и фитиновой кислот, арбутина, ретинилпальмитата. Крем действует в 2 направлениях: устраняет пигментные пятна и корректирует признаки старения.',
        activeComponents: ['Азелоглицин 2%', 'Арбутин', 'Койевая кислота', 'Токоферол'],
        releaseForm: 'Флакон с вакуумным диспенсером'
    },
    {
        id: 'azelaic_cream_8',
        name: 'Azelaic 2-Function Cream 8%',
        category: 'Azelaic',
        prices: [{ size: '30 мл', price: '3 740 р.' }],
        description: 'Интенсивный уходовый крем для борьбы с гиперпигментацией, признаками фото- и хроностарения, содержащий 8% азелоглицина.',
        activeComponents: ['Азелоглицин 8%', 'Арбутин', 'Койевая кислота', 'Токоферол'],
        releaseForm: 'Флакон с вакуумным диспенсером'
    },
];