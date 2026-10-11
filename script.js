const app = document.getElementById('app');
const toast = document.getElementById('toast');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
document.getElementById('year').textContent = new Date().getFullYear();

// Внешние фотографии используются по URL, а не копируются в проект.
function photo(src, width = 850) {
  if (/^(https?:\/\/|\.\/|\/|images\/)/i.test(src || '')) return src;
  return `https://images.unsplash.com/${src}?auto=format&fit=crop&w=${width}&q=85`;
}
const fallbackPhoto = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85';
function imageTag(src, alt, width = 850, className = '', loading = 'lazy') {
  return `<img class="${className}" loading="${loading}" src="${photo(src, width)}" alt="${esc(alt)}" onerror="this.onerror=null;this.src='${fallbackPhoto}'">`;
}
function esc(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

const countries = [
  {id:'kyrgyzstan',name:'Кыргызстан',flag:'🇰🇬',region:'Центральная Азия',continent:'asia',capital:'Бишкек',currency:'Сом (KGS)',language:'Кыргызский, русский',season:'Май — октябрь',img:'https://extraguide.ru/images/pthumb/sp/c4d7c1c078b809b060b781b24c17df2c1ea7cb61.0f89f896.jpg',desc:'Высокие горы, бирюзовые озёра, кочевая культура и искреннее гостеприимство. Здесь можно отправиться в поход, пожить в юрте и увидеть настоящую жизнь горных сёл.'},
  {id:'kazakhstan',name:'Казахстан',flag:'🇰🇿',region:'Центральная Азия',continent:'asia',capital:'Астана',currency:'Тенге (KZT)',language:'Казахский, русский',season:'Май — сентябрь',img:'https://kstrip.ru/wp-content/uploads/2023/07/bayterek_2.jpg',desc:'Современная Астана, горный Алматы, бирюзовые озёра и красные каньоны — Казахстан удивляет масштабом и разнообразием.'},
  {id:'uzbekistan',name:'Узбекистан',flag:'🇺🇿',region:'Центральная Азия',continent:'asia',capital:'Ташкент',currency:'Сум (UZS)',language:'Узбекский, русский',season:'Весна и осень',img:'https://s1.abcstatics.com/abc/www/multimedia/viajar/2023/04/11/PlazadeRegistan-RsV0VeY4X9YIQw5WAOV3EHJ-1200x840%40abc.jpg',desc:'Самарканд, Бухара и Ташкент: архитектура Шёлкового пути, шумные базары, ремёсла и знаменитый узбекский плов.'},
  {id:'tajikistan',name:'Таджикистан',flag:'🇹🇯',region:'Центральная Азия',continent:'asia',capital:'Душанбе',currency:'Сомони (TJS)',language:'Таджикский, русский',season:'Июнь — сентябрь',img:'photo-1464822759023-fed622ff2c3b',desc:'Горы Памира, озёра и высокогорные дороги для тех, кто ищет большие пейзажи и знакомство с горной культурой.'},
  {id:'turkmenistan',name:'Туркменистан',flag:'🇹🇲',region:'Центральная Азия',continent:'asia',capital:'Ашхабад',currency:'Манат (TMT)',language:'Туркменский',season:'Весна и осень',img:'https://sport-marafon.ru/upload/blog/img/39/2226116/2226116-87.jpg',desc:'Беломраморный Ашхабад, древние города и загадочный газовый кратер Дарваза среди пустыни Каракумы.'},
  {id:'georgia',name:'Грузия',flag:'🇬🇪',region:'Кавказ',continent:'asia',capital:'Тбилиси',currency:'Лари (GEL)',language:'Грузинский',season:'Май — октябрь',img:'photo-1473448912268-2022ce9509d8',desc:'Старые улицы Тбилиси, горные пейзажи Казбеги, море в Батуми и гостеприимство.'},
  {id:'japan',name:'Япония',flag:'🇯🇵',region:'Восточная Азия',continent:'asia',capital:'Токио',currency:'Иена (JPY)',language:'Японский',season:'Март — май, октябрь — ноябрь',img:'photo-1493976040374-85c8e12f0c0e',desc:'Традиционные храмы Киото, неоновые улицы Токио, гора Фудзи и культура, где прошлое встречается с будущим.'},
  {id:'thailand',name:'Таиланд',flag:'🇹🇭',region:'Юго-Восточная Азия',continent:'asia',capital:'Бангкок',currency:'Бат (THB)',language:'Тайский',season:'Ноябрь — февраль',img:'photo-1528181304800-259b08848526',desc:'Храмы Бангкока, пляжи Пхукета, ночные рынки и яркая атмосфера Юго-Восточной Азии.'},
  {id:'france',name:'Франция',flag:'🇫🇷',region:'Западная Европа',continent:'europe',capital:'Париж',currency:'Евро (EUR)',language:'Французский',season:'Апрель — июнь, сентябрь — октябрь',img:'photo-1502602898657-3e91760cbb34',desc:'Эйфелева башня и Лувр в Париже, дворец Версаль, уютные города, искусство и французская кухня.'},
  {id:'italy',name:'Италия',flag:'🇮🇹',region:'Южная Европа',continent:'europe',capital:'Рим',currency:'Евро (EUR)',language:'Итальянский',season:'Апрель — июнь, сентябрь — октябрь',img:'https://cdn-imgix.headout.com/media/images/59d4ef22d864fbdb71574fe03f538195-7148-Rome-EntrytoColosseum-PalatineHill-RomanForum-17.jpg?auto=compress%2Cformat&fit=min&w=1300',desc:'Колизей в Риме, каналы Венеции, искусство Флоренции, морские города и кухня, ради которой хочется возвращаться.'},
  {id:'switzerland',name:'Швейцария',flag:'🇨🇭',region:'Западная Европа',continent:'europe',capital:'Берн',currency:'Швейцарский франк (CHF)',language:'Немецкий, французский, итальянский',season:'Июнь — сентябрь, декабрь — март',img:'photo-1464822759023-fed622ff2c3b',desc:'Альпийские вершины, Люцернское озеро, горные поезда и уютные города среди гор.'},
  {id:'spain',name:'Испания',flag:'🇪🇸',region:'Южная Европа',continent:'europe',capital:'Мадрид',currency:'Евро (EUR)',language:'Испанский',season:'Апрель — июнь, сентябрь — октябрь',img:'https://www.espanafascinante.com/media/espanafascinante/images/2018/07/05/20180705094139241570.jpg',desc:'Саграда-Фамилия в Барселоне, Королевский дворец в Мадриде и площадь Испании в Севилье — архитектура, еда и яркая городская жизнь.'},
  {id:'germany',name:'Германия',flag:'🇩🇪',region:'Центральная Европа',continent:'europe',capital:'Берлин',currency:'Евро (EUR)',language:'Немецкий',season:'Май — сентябрь, декабрь',img:'https://www.swedishnomad.com/wp-content/images/2020/03/Brandenburger-Tor.jpg',desc:'Бранденбургские ворота в Берлине, сказочный замок Нойшванштайн и исторические города с музеями и уютными площадями.'},
  {id:'greece',name:'Греция',flag:'🇬🇷',region:'Южная Европа',continent:'europe',capital:'Афины',currency:'Евро (EUR)',language:'Греческий',season:'Май — октябрь',img:'photo-1533105079780-92b9be482077',desc:'Античные памятники Афин, белые домики Санторини, острова, древняя история и лазурное море.'}
];

const places = [
  // Кыргызстан
  {id:'issyk-kul',country:'kyrgyzstan',name:'Иссык-Куль',city:'Чолпон-Ата и побережье',subtitle:'Бирюзовое озеро среди гор',type:'Природа и отдых',days:'1–3 дня',price:45,img:'https://extraguide.ru/images/pthumb/sp/c4d7c1c078b809b060b781b24c17df2c1ea7cb61.0f89f896.jpg',description:'Иссык-Куль — одно из крупнейших высокогорных озёр мира. На берегах соседствуют пляжи, ущелья, небольшие сёла и панорамные горные дороги.',history:'Название «Ысык-Көл» переводят как «тёплое озеро»: благодаря особенностям воды озеро обычно не замерзает зимой. Регион был связан с маршрутами Шёлкового пути. В окрестностях сохранились следы древних поселений и памятники разных эпох.',video:'Иссык-Куль Кыргызстан путешествие озеро'},
  {id:'ala-archa',country:'kyrgyzstan',name:'Ала-Арча',city:'Национальный парк рядом с Бишкеком',subtitle:'Горные реки, хвойные леса и тропы',type:'Хайкинг',days:'1 день',price:25,img:'https://images.squarespace-cdn.com/content/v1/57483e0df699bbec3bf5f6ef/1577026300787-CS2UOX4D72GNEP4W8R76/Hiking-Ala-Archa-National-Park-Day-trip-from-Bishkek.jpg?format=2500w',description:'Национальный парк Ала-Арча — ущелье с горными реками, хвойными лесами и тропами с видами на вершины. Подходит для однодневной поездки.',history:'Ущелье расположено в Кыргызском Ала-Тоо. Название связано с арчой — можжевельником, который растёт в горах и имеет значение в местной культуре.',video:'Ала-Арча национальный парк Кыргызстан'},
  {id:'song-kol',country:'kyrgyzstan',name:'Сон-Көл',city:'Нарынская область',subtitle:'Юрты, жайлоо и кочевая культура',type:'Культура и природа',days:'2–3 дня',price:110,img:'photo-1464278533981-50106e6176b1',description:'Высокогорное озеро, широкие жайлоо и традиционные юрты. Здесь знакомятся с кочевым образом жизни и местной кухней.',history:'Сон-Көл издавна использовался как летнее пастбище. Летом сюда поднимаются пастухи с семьями и скотом. Юрта, конные традиции и гостеприимство помогают узнать культуру кыргызских кочевников.',video:'Сон-Көл Кыргызстан юрты озеро'},
  {id:'burana',country:'kyrgyzstan',name:'Башня Бурана',city:'Чуйская область, рядом с Токмоком',subtitle:'Следы древнего Баласагуна',type:'История',days:'1 день',price:30,img:'photo-1512453979798-5ea266f8880c',description:'Исторический комплекс с минаретом, археологическими остатками и каменными изваяниями неподалёку от Токмока.',history:'Башня Бурана — сохранившаяся часть древнего города Баласагун, одного из важных центров государства Караханидов. Комплекс напоминает о торговле и культурных связях региона на Шёлковом пути.',video:'Башня Бурана Кыргызстан история'},
  {id:'jeti-oguz',country:'kyrgyzstan',name:'Джети-Огуз',city:'Иссык-Кульская область, около Каракола',subtitle:'Красные скалы и лесные тропы',type:'Природа',days:'1–2 дня',price:65,img:'photo-1472396961693-142e6e269027',description:'Знаменитые красные скалы, хвойные леса и тропы в ущелье неподалёку от Каракола.',history:'Название Джети-Огуз переводится как «семь быков» и связано с формой красных скальных образований. С этим местом связаны местные легенды о силе природы.',video:'Джети-Огуз Кыргызстан видео'},
  {id:'karakol',country:'kyrgyzstan',name:'Каракол',city:'Восточный Иссык-Куль',subtitle:'Город, горы и культурное разнообразие',type:'Город и культура',days:'2 дня',price:90,img:'photo-1464822759023-fed622ff2c3b',description:'Каракол известен как отправная точка к горным маршрутам, исторической архитектурой и разнообразной кухней.',history:'Город развивался как торговый и административный центр восточного Иссык-Куля. Разные традиции отражены в архитектуре, музеях и местной кухне.',video:'Каракол Кыргызстан путешествие'},
  // Казахстан
  {id:'baiterek',country:'kazakhstan',name:'Байтерек',city:'Астана',subtitle:'Символ современной столицы',type:'Архитектура и город',days:'1 день',price:35,img:'https://kstrip.ru/wp-content/uploads/2023/07/bayterek_2.jpg',description:'Монумент Байтерек — одна из самых узнаваемых достопримечательностей Астаны. С обзорной площадки открывается вид на современный центр столицы.',history:'Монумент открыли в начале 2000-х годов и связали с образом дерева жизни и популярным казахским мифом о Самруке. Он стал символом новой столицы и независимого Казахстана.',video:'Астана Байтерек Казахстан обзорная площадка'},
  {id:'almaty',country:'kazakhstan',name:'Алматы и Кок-Тобе',city:'Алматы',subtitle:'Город у подножия Тянь-Шаня',type:'Город и природа',days:'1–2 дня',price:55,img:'https://img.avs.io/psgr/shutterstock_2342271723_9f0ac34220?rs=fill%3A3840%3A2834%3A0',description:'Погуляй по Алматы, поднимись на Кок-Тобе за панорамой города и гор, загляни в парки и на местные рынки.',history:'Алматы вырос у северных склонов Тянь-Шаня и долгое время был важным культурным и торговым центром региона. Его название связывают с яблонями, которые исторически росли в этой местности.',video:'Алматы Кок-Тобе Казахстан путешествие'},
  {id:'charyn',country:'kazakhstan',name:'Чарынский каньон',city:'Алматинская область',subtitle:'Красные скалы и долина замков',type:'Природа и хайкинг',days:'1 день',price:75,img:'photo-1752583988976-a2f43f48d907',description:'Чарынский каньон впечатляет красными и оранжевыми скальными стенами, которые ветер и вода формировали на протяжении долгого времени.',history:'Каньон расположен на юго-востоке Казахстана. Один из самых посещаемых участков называют Долиной замков из-за необычных форм скал. Маршрут требует подходящей обуви и соблюдения правил национального парка.',video:'Чарынский каньон Казахстан путешествие'},
  // Узбекистан
  {id:'registan',country:'uzbekistan',name:'Регистан',city:'Самарканд',subtitle:'Бирюзовые купола и сердце Шёлкового пути',type:'История и архитектура',days:'1 день',price:40,img:'photo-1763144967763-2a8a98cb8431',description:'Площадь Регистан — знаменитый ансамбль медресе с мозаикой, порталами и бирюзовыми куполами. Рядом находятся другие памятники Самарканда и традиционные ремесленные лавки.',history:'В Средние века Регистан был центральной площадью Самарканда, где проходили торговля и общественная жизнь. При Улугбеке он приобрёл образовательное значение, а ансамбль стал выдающимся примером архитектуры Центральной Азии.',video:'Самарканд Регистан плов что посмотреть',videoId:'CBGRfDrm9sc',videoUrl:'https://uzbekistan.travel/en/i/samarkand/'},
  {id:'bukhara',country:'uzbekistan',name:'Бухара и минарет Калян',city:'Бухара',subtitle:'Старинные улочки и ремесленные купола',type:'История и культура',days:'1–2 дня',price:55,img:'https://sport-marafon.ru/upload/blog/img/39/2226116/2226116-87.jpg',description:'В старой Бухаре можно увидеть минарет Калян, медресе, крытые базары и дворики, где продолжаются ремесленные традиции.',history:'Бухара была важным центром науки, религии, торговли и образования на Шёлковом пути. Исторический центр сохранил слои архитектуры разных эпох и традиционную городскую планировку.',video:'Бухара Узбекистан минарет Калян старый город'},
  {id:'tashkent-plov',country:'uzbekistan',name:'Чорсу и узбекский плов',city:'Ташкент',subtitle:'Базар, лепёшки и ароматный плов',type:'Гастрономия и культура',days:'1 день',price:35,img:'https://avatars.mds.yandex.net/get-vthumb/1974321/106fa28d6982a21e3a729086a47c77f7/800x450',description:'На базаре Чорсу можно увидеть горы специй, сухофрукты, свежие лепёшки и традиционные блюда. Для гастрономического знакомства попробуй ташкентский плов.',history:'Чорсу — один из известных базаров Ташкента, продолживший традицию торговли на пересечении городских дорог. Плов занимает важное место в узбекской культуре: его готовят для семейных встреч, праздников и больших общих трапез.',video:'Ташкент Чорсу базар узбекский плов street food'},
  // Таджикистан
  {id:'iskanderkul',country:'tajikistan',name:'Озеро Искандеркуль',city:'Фанские горы',subtitle:'Горное озеро с бирюзовой водой',type:'Природа',days:'1–2 дня',price:80,img:'photo-1464822759023-fed622ff2c3b',description:'Озеро Искандеркуль окружено горными склонами и входит в число известных природных мест Фанских гор.',history:'Название озера связывают с именем Александра Македонского, которого в восточных преданиях называли Искандаром. Истории о его пути добавили месту легендарный оттенок.',video:'Искандеркуль Таджикистан озеро'},
  {id:'pamir',country:'tajikistan',name:'Памирская дорога',city:'Горно-Бадахшанская автономная область',subtitle:'Высокогорные перевалы и удалённые долины',type:'Приключение',days:'5–7 дней',price:350,img:'photo-1464822759023-fed622ff2c3b',description:'Памирский маршрут проходит через высокогорные долины, перевалы и небольшие поселения на востоке Таджикистана.',history:'Дороги Памира связывали горные сообщества и торговые пути региона. Сегодня маршрут ценят за пейзажи и возможность узнать жизнь высокогорных поселений; путешествие требует тщательной подготовки.',video:'Pamir Highway Tajikistan travel documentary'},
  // Туркменистан
  {id:'darvaza',country:'turkmenistan',name:'Кратер Дарваза',city:'Пустыня Каракумы',subtitle:'Необычная огненная впадина в пустыне',type:'Природа и приключение',days:'1–2 дня',price:140,img:'photo-1509316785289-025f5b846b35',description:'Дарваза — знаменитый газовый кратер посреди пустыни Каракумы. Поездка обычно включает длительный трансфер и ночное наблюдение за пейзажем.',history:'Кратер стал известен после возгорания природного газа в советский период. Детали происхождения описывают по-разному, поэтому на месте гид должен опираться на актуальную информацию и правила доступа.',video:'Darvaza gas crater Turkmenistan travel'},
  {id:'ashgabat',country:'turkmenistan',name:'Ашхабад',city:'Столица Туркменистана',subtitle:'Беломраморная архитектура и музеи',type:'Город и архитектура',days:'1–2 дня',price:60,img:'photo-1494526585095-c41746248156',description:'Ашхабад известен монументальной архитектурой, широкими проспектами и музеями, рассказывающими об истории региона.',history:'Современный город неоднократно перестраивался после землетрясения 1948 года. Архитектурный облик столицы сочетает современные монументы и национальные мотивы.',video:'Ashgabat Turkmenistan city travel'},
  // Грузия
  {id:'tbilisi',country:'georgia',name:'Старый Тбилиси',city:'Тбилиси',subtitle:'Балконы, серные бани и уютные улочки',type:'Город и культура',days:'1 день',price:45,img:'photo-1473448912268-2022ce9509d8',description:'Старый Тбилиси приглашает прогуляться по узким улицам, увидеть разноцветные балконы и познакомиться с местной кухней.',history:'Тбилиси развивался на торговых путях между Европой и Азией. Его исторические районы отражают влияние разных эпох и культур.',video:'Tbilisi Georgia old town travel'},
  {id:'kazbegi',country:'georgia',name:'Казбеги и Гергети',city:'Степанцминда',subtitle:'Горная церковь на фоне Кавказа',type:'Природа и история',days:'1–2 дня',price:95,img:'photo-1464822759023-fed622ff2c3b',description:'Панорамная поездка к горам Кавказа и церкви Гергети — одному из узнаваемых видов Грузии.',history:'Троицкая церковь Гергети находится высоко над долиной у подножия Казбека. Она стала важным духовным и культурным символом горного региона.',video:'Gergeti Trinity Church Kazbegi Georgia'},
  {id:'batumi',country:'georgia',name:'Батуми и набережная',city:'Батуми',subtitle:'Чёрное море, парки и современная архитектура',type:'Море и город',days:'2 дня',price:100,img:'photo-1473116763249-2faaef81ccda',description:'Батуми соединяет морскую набережную, зелёные парки, старые улицы и современную архитектуру.',history:'Батуми вырос как портовый город на восточном побережье Чёрного моря и стал важным торговым центром региона.',video:'Batumi Georgia seaside boulevard travel'},
  // Япония
  {id:'kyoto',country:'japan',name:'Киото и бамбуковая роща',city:'Киото',subtitle:'Храмы, сады и традиционные кварталы',type:'Культура и природа',days:'1–2 дня',price:130,img:'photo-1493976040374-85c8e12f0c0e',description:'Киото известен храмами, садами, деревянными кварталами и знаменитой бамбуковой рощей Арасияма.',history:'Киото был столицей Японии на протяжении многих веков. Его храмы, дворцы и сады сохраняют важные элементы японской архитектуры и культурных традиций.',video:'Kyoto Japan travel bamboo forest temples'},
  {id:'tokyo',country:'japan',name:'Токио: от храмов к неону',city:'Токио',subtitle:'Современный город и традиционные святилища',type:'Город и культура',days:'1–3 дня',price:150,img:'photo-1540959733332-eab4deabeeaf',description:'Токио объединяет традиционные храмы, тихие сады, районы моды, небоскрёбы и яркую гастрономическую сцену.',history:'Токио был известен как Эдо до переименования в XIX веке. Сегодня это огромный мегаполис, в котором сохраняются исторические святыни и современные культурные районы.',video:'Tokyo Japan city travel guide'},
  {id:'fuji',country:'japan',name:'Гора Фудзи',city:'Регион Фудзи-Хаконэ-Идзу',subtitle:'Знаменитая вершина Японии',type:'Природа',days:'1–2 дня',price:120,img:'photo-1490806843957-31f4c9a91c65',description:'В ясную погоду гора Фудзи видна из окружающих озёр и смотровых площадок. Доступ к тропам зависит от сезона и правил.',history:'Фудзи имеет большое значение в японской культуре, искусстве и духовных традициях. Её силуэт многократно появлялся в гравюрах и живописи.',video:'Mount Fuji Japan travel lake view'},
  // Таиланд
  {id:'bangkok',country:'thailand',name:'Бангкок и Королевский дворец',city:'Бангкок',subtitle:'Храмы, каналы и уличная еда',type:'Город и культура',days:'1 день',price:65,img:'photo-1528181304800-259b08848526',description:'Бангкок предлагает храмы, оживлённые рынки, каналы и огромный выбор тайской уличной еды.',history:'Бангкок стал столицей Таиланда в XVIII веке. Город вырос вокруг реки Чаупхрая, которая долго была главным транспортным путём.',video:'Bangkok Grand Palace street food travel'},
  {id:'phuket',country:'thailand',name:'Пхукет и Андаманское море',city:'Пхукет',subtitle:'Пляжи, бухты и смотровые площадки',type:'Море и отдых',days:'2–4 дня',price:180,img:'photo-1528181304800-259b08848526',description:'Пхукет сочетает пляжи, старый город и поездки к соседним островам. Для морских экскурсий важно учитывать погоду и правила безопасности.',history:'Остров был важной точкой морской торговли в Андаманском море. Старый город отражает культурные связи региона и историю торговли оловом.',video:'Phuket Thailand island beaches travel'},
  {id:'chiang-mai',country:'thailand',name:'Чиангмай и горные храмы',city:'Чиангмай',subtitle:'Старый город и горы севера Таиланда',type:'Культура и природа',days:'2 дня',price:120,img:'photo-1528181304800-259b08848526',description:'Чиангмай известен историческими храмами, ночными рынками и зелёными горными окрестностями.',history:'Город был столицей исторического королевства Ланна. Его старые стены и храмы напоминают об отдельной культурной традиции северного Таиланда.',video:'Chiang Mai Thailand old town temples travel'},
  // Франция
  {id:'paris',country:'france',name:'Эйфелева башня и Сена',city:'Париж',subtitle:'Панорамы, набережные и символ Франции',type:'Архитектура',days:'1 день',price:95,img:'photo-1502602898657-3e91760cbb34',description:'Начни знакомство с Парижем с Эйфелевой башни, набережных Сены, мостов и прогулки по историческим кварталам.',history:'Эйфелеву башню построили для Всемирной выставки 1889 года. Проект инженера Гюстава Эйфеля сначала вызывал споры, но со временем башня стала символом Парижа.',video:'Paris Eiffel Tower Seine walking tour',videoUrl:'https://www.toureiffel.paris/en/explore'},
  {id:'louvre',country:'france',name:'Лувр и исторический центр',city:'Париж',subtitle:'Музей мирового искусства и королевская история',type:'Искусство и история',days:'1 день',price:85,img:'https://cdn-imgix.headout.com/media/images/9005a46b322b473506d0bd7c1a996207-Combo-First-Image-Template.jpg?auto=compress%2Cformat&fit=min&w=1300',description:'Лувр — один из самых известных музеев мира. Вокруг него расположены сад Тюильри, исторические мосты и улицы центрального Парижа.',history:'Здание Лувра начиналось как крепость в Средние века, затем стало королевской резиденцией и позже превратилось в публичный музей. Коллекция охватывает множество периодов и культур.',video:'Louvre Museum Paris virtual tour'},
  {id:'versailles',country:'france',name:'Дворец Версаль',city:'Версаль, рядом с Парижем',subtitle:'Залы, зеркальная галерея и сады',type:'Архитектура и история',days:'1 день',price:110,img:'https://cdn.getyourguide.com/image/%7Boptions%7D/tour_img/d1a95e4089a2e069e70d7623b907a51a2aff2416d7a8b856942c64a966c4bedf.jpeg',description:'Версальский дворец знаменит парадными залами, зеркальной галереей и обширными садами.',history:'Версаль стал центром французского королевского двора при Людовике XIV. Архитектура и сады отражали представления эпохи о власти, порядке и искусстве.',video:'Palace of Versailles France virtual tour'},
  // Италия
  {id:'rome',country:'italy',name:'Колизей и Римский форум',city:'Рим',subtitle:'Античный город и его памятники',type:'История',days:'1–2 дня',price:120,img:'https://cdn-imgix.headout.com/media/images/59d4ef22d864fbdb71574fe03f538195-7148-Rome-EntrytoColosseum-PalatineHill-RomanForum-17.jpg?auto=compress%2Cformat&fit=min&w=1300',description:'Колизей, Римский форум и Палатин помогают представить общественную жизнь и архитектуру Древнего Рима.',history:'Колизей начали строить в I веке нашей эры. Амфитеатр был важной частью общественной жизни Древнего Рима и сегодня остаётся одним из самых известных памятников античности.',video:'Rome Colosseum Roman Forum travel guide',videoId:'P2GQCrN7CwA',videoUrl:'https://colosseo.it/en/parco-online/'},
  {id:'venice',country:'italy',name:'Венеция и Гранд-канал',city:'Венеция',subtitle:'Каналы, мосты и дворцы на воде',type:'Город и архитектура',days:'1–2 дня',price:135,img:'https://cdn.sanity.io/images/nxpteyfv/goguides/e0241927af07e8b3f56329242c3f9d0998fdb8d2-1600x1066.jpg',description:'Венеция — город островов и каналов с готическими дворцами, площадями и мостами. Удобнее всего исследовать её пешком и на водном транспорте.',history:'Город развивался как морская республика и торговый центр. Гранд-канал служил главной водной артерией, вдоль которой строились дворцы богатых венецианских семей.',video:'Venice Grand Canal Italy travel'},
  {id:'florence',country:'italy',name:'Флоренция и собор Дуомо',city:'Флоренция',subtitle:'Ренессанс, искусство и площади',type:'Искусство и история',days:'1–2 дня',price:125,img:'https://www.fortreisen.com/img/containers/main/img/florenz/piazza-del-duomo-florenz.jpg/f8b833ac874922ad95e998b033a423f6.jpg',description:'Флоренция славится собором Санта-Мария-дель-Фьоре, художественными музеями, мостами и архитектурой эпохи Возрождения.',history:'В эпоху Ренессанса Флоренция стала одним из ведущих центров искусства, науки и торговли Европы. Архитектура города связана с работами Брунеллески, Джотто и многих других мастеров.',video:'Florence Duomo Italy walking tour'},
  // Швейцария
  {id:'lucerne',country:'switzerland',name:'Люцерн и Капельбрюкке',city:'Люцерн',subtitle:'Озеро, мост и старый город',type:'Город и природа',days:'1 день',price:100,img:'photo-1531366936337-7c912a4589a7',description:'Люцерн сочетает набережную озера, деревянный мост Капельбрюкке и виды на окружающие горы.',history:'Люцерн вырос как важный пункт на торговых путях через Альпы. Его деревянный мост — один из узнаваемых исторических символов города.',video:'Lucerne Switzerland Chapel Bridge travel'},
  {id:'jungfrau',country:'switzerland',name:'Юнгфрау и альпийские виды',city:'Бернские Альпы',subtitle:'Высокие вершины и горные поезда',type:'Природа',days:'1–2 дня',price:220,img:'photo-1464822759023-fed622ff2c3b',description:'Регион Юнгфрау известен панорамными маршрутами, горными деревнями и видами на альпийские вершины.',history:'Альпийские перевалы столетиями связывали швейцарские долины. Развитие железных дорог сделало высокогорные пейзажи доступнее для путешественников.',video:'Jungfrau Swiss Alps travel guide'},
  // Испания
  {id:'barcelona',country:'spain',name:'Саграда-Фамилия',city:'Барселона',subtitle:'Знаменитая базилика Антонио Гауди',type:'Архитектура и искусство',days:'1 день',price:100,img:'https://www.espanafascinante.com/media/espanafascinante/images/2018/07/05/20180705094139241570.jpg',description:'Саграда-Фамилия — необычная базилика с высокими башнями, сложным декором и яркими витражами, созданная по проекту Антонио Гауди.',history:'Гауди возглавил проект в 1883 году и продолжал работать над ним десятилетиями. Строительство продолжалось и в XXI веке; храм стал архитектурным символом Барселоны.',video:'Barcelona Sagrada Familia travel video',videoUrl:'https://www.spain.info/en/places-of-interest/sagrada-familia/'},
  {id:'madrid',country:'spain',name:'Королевский дворец',city:'Мадрид',subtitle:'Парадные площади и история Испании',type:'Архитектура и история',days:'1 день',price:75,img:'https://images.musement.com/cover/0145/68/thumb_14467604_cover_header.jpeg',description:'Королевский дворец Мадрида — величественная резиденция с парадными залами и большой площадью перед фасадом. Рядом находятся исторические улицы и сады.',history:'Дворец XVIII века стоит на месте старого Алькасара. Он до сих пор используется для официальных мероприятий и открыт для посещения по расписанию.',video:'Madrid Royal Palace Spain travel'},
  {id:'seville',country:'spain',name:'Площадь Испании',city:'Севилья',subtitle:'Аркады, керамика и канал',type:'Архитектура и город',days:'1 день',price:70,img:'https://www.tourismus.de/files/sevilla-plaza-espana-scaled.jpeg',description:'Площадь Испании в Севилье — полукруглый архитектурный ансамбль с аркадами, керамическими деталями и каналом.',history:'Ансамбль построили к Иберо-американской выставке 1929 года. Его архитектура соединяет региональные мотивы и стили начала XX века.',video:'Seville Plaza de Espana Spain travel'},
  // Германия
  {id:'berlin',country:'germany',name:'Бранденбургские ворота',city:'Берлин',subtitle:'Исторический символ немецкой столицы',type:'История и город',days:'1 день',price:80,img:'https://www.swedishnomad.com/wp-content/images/2020/03/Brandenburger-Tor.jpg',description:'Бранденбургские ворота, Рейхстаг и исторический центр — хорошая отправная точка для знакомства с Берлином.',history:'Ворота построили в конце XVIII века. В XX веке они стали символом разделения Берлина, а после объединения Германии — символом единства.',video:'Berlin Brandenburg Gate travel guide'},
  {id:'neuschwanstein',country:'germany',name:'Замок Нойшванштайн',city:'Бавария',subtitle:'Сказочный замок среди альпийских пейзажей',type:'История и природа',days:'1 день',price:145,img:'https://a.travel-assets.com/findyours-php/viewfinder/images/res40/109000/109766.jpg',description:'Нойшванштайн возвышается над лесами и озёрами Баварии. Маршрут обычно включает смотровые площадки и прогулку по окрестностям.',history:'Замок строили по заказу баварского короля Людвига II в XIX веке. Он вдохновлён романтическими представлениями о средневековых замках и стал одной из известных достопримечательностей Германии.',video:'Neuschwanstein Castle official film',videoUrl:'https://www.neuschwanstein.de/englisch/tourist/'},
  {id:'cologne',country:'germany',name:'Кёльнский собор',city:'Кёльн',subtitle:'Готический собор у Рейна',type:'Архитектура и история',days:'1 день',price:70,img:'photo-1467269204594-9661b134dd2b',description:'Кёльнский собор возвышается рядом с главным вокзалом и набережной Рейна. В городе также можно посетить музеи и старый центр.',history:'Строительство собора началось в XIII веке и продолжалось столетиями. Он стал одним из самых известных памятников готической архитектуры Европы.',video:'Cologne Cathedral Germany travel'},
  // Греция
  {id:'athens',country:'greece',name:'Акрополь и Афины',city:'Афины',subtitle:'Древняя история над современным городом',type:'История',days:'1 день',price:90,img:'photo-1533105079780-92b9be482077',description:'Акрополь, Парфенон, музеи и старые кварталы позволяют увидеть следы античной цивилизации в современной греческой столице.',history:'Афинский Акрополь был важным религиозным и общественным центром древнего города. Парфенон построили в V веке до нашей эры.',video:'Athens Acropolis Greece travel'},
  {id:'santorini',country:'greece',name:'Санторини',city:'Кикладские острова',subtitle:'Белые домики и виды на Эгейское море',type:'Море и город',days:'2–3 дня',price:190,img:'photo-1533105079780-92b9be482077',description:'Санторини известен белыми домами, синими куполами, вулканическими пейзажами и видами на кальдеру.',history:'Остров сформировался в результате мощных вулканических процессов. Археологические находки Акротири свидетельствуют о древнем поселении, существовавшем до крупного извержения.',video:'Santorini Greece island travel video'}
];

const tours = [
  {id:'lake-day',place:'issyk-kul',country:'kyrgyzstan',name:'Иссык-Куль за один день',days:'1 день',type:'Однодневный',price:45,group:'2–8 человек',transport:'Минивэн',desc:'Побережье, панорамные остановки и свободное время у озера.'},
  {id:'lake-weekend',place:'issyk-kul',country:'kyrgyzstan',name:'Иссык-Куль: выходные',days:'2 дня / 1 ночь',type:'Двухдневный',price:135,group:'2–8 человек',transport:'Минивэн',desc:'Озеро, местная кухня, закат и ночёвка в гостевом доме.'},
  {id:'mountain-day',place:'ala-archa',country:'kyrgyzstan',name:'Тропа Ала-Арча',days:'1 день',type:'Однодневный',price:25,group:'2–10 человек',transport:'Трансфер',desc:'Прогулка по ущелью с остановками для фото и отдыха.'},
  {id:'nomad-3',place:'song-kol',country:'kyrgyzstan',name:'Кочевой Кыргызстан',days:'3 дня / 2 ночи',type:'Многодневный',price:220,group:'2–6 человек',transport:'Внедорожник',desc:'Сон-Көл, юрты, конные прогулки по желанию и традиционная кухня.'},
  {id:'history-day',place:'burana',country:'kyrgyzstan',name:'По следам Шёлкового пути',days:'1 день',type:'Однодневный',price:30,group:'2–12 человек',transport:'Минивэн',desc:'Башня Бурана, музей под открытым небом и рассказ об истории региона.'},
  {id:'red-rocks',place:'jeti-oguz',country:'kyrgyzstan',name:'Красные скалы Джети-Огуз',days:'2 дня / 1 ночь',type:'Двухдневный',price:95,group:'2–8 человек',transport:'Минивэн',desc:'Горные пейзажи, лесные тропы и ночь в гостевом доме.'},
  {id:'paris-walk',place:'paris',country:'france',name:'Первое знакомство с Парижем',days:'1 день',type:'Однодневный',price:95,group:'2–8 человек',transport:'Пешком / метро',desc:'Эйфелева башня, Сена, исторический центр и фотолокации.'},
  {id:'rome-classic',place:'rome',country:'italy',name:'Классический Рим',days:'2 дня',type:'Двухдневный',price:210,group:'2–8 человек',transport:'Пешком / метро',desc:'Античные памятники, площади и гастрономические остановки.'}
];
// Создаём базовую экскурсию для каждого места, у которого ещё нет своего тура.
for (const p of places) {
  if (!tours.some(t => t.place === p.id)) {
    const oneDay = /^1/.test(p.days);
    const twoDays = /^2/.test(p.days);
    const type = oneDay ? 'Однодневный' : (twoDays ? 'Двухдневный' : 'Многодневный');
    const duration = oneDay ? '1 день' : (twoDays ? '2 дня' : p.days);
    tours.push({id:`${p.id}-tour`,place:p.id,country:p.country,name:`${p.name} — экскурсия`,days:duration,type,price:p.price,group:'2–8 человек',transport:'Уточняется',desc:`Знакомство с местом «${p.name}», его главными видами и историей. Точная программа согласовывается перед поездкой.`});
  }
}

const guides = [
  {name:'Айбек',role:'Горный гид · Кыргызстан',rating:'4.9',langs:'Кыргызский, русский, английский',years:'Профиль для учебного проекта',img:'photo-1500648767791-00dcc994a43e',bio:'Помогает узнавать горные маршруты, кочевые традиции и местную культуру. Делает акцент на безопасном темпе и подготовке к поездке.'},
  {name:'Алия',role:'Культура и история · Центральная Азия',rating:'4.8',langs:'Кыргызский, русский, английский',years:'Профиль для учебного проекта',img:'photo-1534528741775-53994a69daeb',bio:'Собирает городские прогулки вокруг архитектуры, ремёсел, еды и историй местных жителей.'},
  {name:'Марат',role:'Природные маршруты · Тянь-Шань',rating:'5.0',langs:'Кыргызский, русский',years:'Профиль для учебного проекта',img:'photo-1506794778202-cad84cf45f1d',bio:'Подбирает походы по уровню группы, рассказывает о горной природе и планировании маршрута.'},
  {name:'София',role:'Городские прогулки · Европа',rating:'4.9',langs:'Русский, английский, французский',years:'Профиль для учебного проекта',img:'photo-1508214751196-bcfd4ca60f91',bio:'Помогает открыть Париж и европейские города через музеи, городские площади, архитектуру и небольшие кафе.'},
  {name:'Даниэль',role:'Архитектура и музеи · Европа',rating:'4.8',langs:'Немецкий, английский, русский',years:'Профиль для учебного проекта',img:'photo-1507003211169-0a1dd7228f2d',bio:'Составляет маршруты по историческим центрам и подсказывает, как познакомиться с городом за короткое время.'},
  {name:'Джулия',role:'Искусство и гастрономия · Италия',rating:'4.9',langs:'Итальянский, английский',years:'Профиль для учебного проекта',img:'photo-1544005313-94ddf0286df2',bio:'Проводит тематические маршруты по архитектуре, искусству и местной кухне.'}
];

const groups = {
  asia:[
    {name:'Центральная Азия',ids:['kyrgyzstan','kazakhstan','uzbekistan','tajikistan','turkmenistan']},
    {name:'Восточная Азия',ids:['japan']},
    {name:'Юго-Восточная Азия',ids:['thailand']},
    {name:'Западная Азия и Кавказ',ids:['georgia']}
  ],
  europe:[
    {name:'Западная Европа',ids:['france','switzerland','germany']},
    {name:'Южная Европа',ids:['italy','spain','greece']}
  ]
};
const getCountry = id => countries.find(x => x.id === id);
const getPlace = id => places.find(x => x.id === id);
const getTour = id => tours.find(x => x.id === id);

function hero(title, desc, crumb = '') {
  return `<section class="pagehero"><div class="container"><div class="crumb"><a href="#home">Главная</a>${crumb ? '　›　' + esc(crumb) : ''}</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></div></section>`;
}
function destinationCard(c) {
  if (!c) return '';
  return `<a class="destcard" href="#country/${c.id}">${imageTag(c.img,c.name,650)}<div class="destcontent"><span class="kicker">${esc(c.region)}</span><h3>${c.flag} ${esc(c.name)}</h3><p>${esc(c.desc)}</p><span class="arrow">↗</span></div></a>`;
}
function countryCard(c) {
  if (!c) return '';
  return `<a class="countrycard" href="#country/${c.id}">${imageTag(c.img,c.name,500)}<div class="countrymeta"><h4>${c.flag} ${esc(c.name)}</h4><p>${esc(c.region)}</p></div></a>`;
}
function tourCard(t) {
  const p = getPlace(t.place);
  return `<article class="tourcard">${imageTag(p ? p.img : getCountry(t.country)?.img,t.name,700)}<div class="tourbody"><div class="pills"><span class="pill">${esc(t.type)}</span><span class="pill">${esc(t.days)}</span></div><h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p><div class="meta"><span>◷ ${esc(t.days)}</span><span>♧ ${esc(t.group)}</span><span>⌁ ${esc(t.transport)}</span></div><div class="tourbottom"><span class="price">от $${t.price} <small>/ чел.</small></span><a class="btn btn-dark btn-small" href="#tour/${t.id}">Подробнее ↗</a></div></div></article>`;
}
function guideCard(g) {
  return `<article class="guidecard">${imageTag(g.img,`Портрет-профиль гида ${g.name}`,600)}<div class="guidebody"><span class="kicker">${esc(g.role)}</span><h3>${esc(g.name)}</h3><div class="rating">★ ${g.rating} · ${esc(g.years)}</div><p>${esc(g.bio)}</p><p><b>Языки:</b> ${esc(g.langs)}</p><button class="btn btn-dark btn-small" data-guide="${esc(g.name)}">Написать о гиде ↗</button></div></article>`;
}
function renderRegions(cont = 'asia') {
  return `<div class="regions">${groups[cont].map(group => `<section><div class="regiontitle"><div><p class="eyebrow">${cont === 'asia' ? 'АЗИЯ' : 'ЕВРОПА'} · РЕГИОН</p><h3>${esc(group.name)}</h3></div><span class="caption">${group.ids.length} направлений</span></div><div class="countrygrid">${group.ids.map(id => countryCard(getCountry(id))).join('')}</div></section>`).join('')}</div>`;
}
function home() {
  return `<section class="hero"><div class="container hero-content"><p class="eyebrow">АВТОРСКИЕ ПУТЕШЕСТВИЯ · NOMAD TRAVEL</p><h1>Открой мир<br>вместе с <em>Nomad Travel</em></h1><p class="hero-copy">От гор Центральной Азии до старинных улиц Европы. Выбирай направление, знакомься с местной культурой и собирай истории, которые захочется рассказывать.</p><div class="hero-bottom"><a class="btn" href="#destinations">Выбрать направление →</a><span class="caption">✦ Маленькие группы · Живые истории · Местные гиды</span></div></div></section>
  <div class="container search-panel"><form id="quickSearch" class="searchbox"><div class="field"><label for="searchCountry">Куда отправимся?</label><select id="searchCountry">${countries.map(c=>`<option value="${c.id}">${c.flag} ${esc(c.name)}</option>`).join('')}</select></div><div class="field"><label for="searchDuration">Длительность</label><select id="searchDuration"><option value="all">Любая</option><option value="1">1 день</option><option value="2">2 дня и больше</option></select></div><div class="field"><label for="searchStyle">Стиль поездки</label><select id="searchStyle"><option value="all">Любой</option><option value="nature">Природа</option><option value="culture">История и культура</option></select></div><button class="btn btn-dark" type="submit">Найти тур ↗</button></form></div>
  <section class="section"><div class="container"><div class="sectionhead"><div><p class="eyebrow">ВЫБИРАЙ СВОЙ МАРШРУТ</p><h2>Места, которые<br>запоминаются</h2></div><a class="textlink" href="#destinations">Все направления →</a></div><div class="cards">${['kyrgyzstan','uzbekistan','kazakhstan','spain'].map(id=>destinationCard(getCountry(id))).join('')}</div></div></section>
  <section class="section white" id="destinations"><div class="container"><div class="sectionhead"><div><p class="eyebrow">ОТ КОНТИНЕНТА К СТРАНЕ</p><h2>Куда лежит твой путь?</h2></div><p>Сначала выбери часть света, затем регион и страну. Внутри страны выбирай город или достопримечательность, чтобы открыть тур, видео и историю места.</p></div><div class="tabs"><button class="tab active" data-continent="asia">Азия</button><button class="tab" data-continent="europe">Европа</button></div><div id="regionArea">${renderRegions('asia')}</div></div></section>
  <section class="quote"><div class="container quoteinner"><blockquote><small>НАШ ВЗГЛЯД НА ПУТЕШЕСТВИЯ</small>«Путешествие — это не только увидеть новое место. Это узнать новую историю и немного по-другому увидеть себя».</blockquote><a class="btn" href="#about">Наша история ↗</a></div></section>
  <section class="section soft"><div class="container"><div class="sectionhead"><div><p class="eyebrow">ПОПУЛЯРНЫЕ МАРШРУТЫ</p><h2>Выходные с впечатлениями</h2></div><a class="textlink" href="#tours">Все туры →</a></div><div class="tourgrid">${['lake-day','registan-tour','baiterek-tour'].map(id=>tourCard(getTour(id))).join('')}</div></div></section>
  <section class="section white"><div class="container"><div class="sectionhead"><div><p class="eyebrow">ЛЮДИ, КОТОРЫЕ ЗНАЮТ МЕСТО</p><h2>Твои гиды</h2></div><a class="textlink" href="#guides">Все гиды →</a></div><div class="guidegrid">${guides.slice(0,3).map(guideCard).join('')}</div><p class="notice">Профили и оценки гидов демонстрационные; фото — портретные изображения из внешних фотоколлекций. Это не подтверждённые реальные сотрудники туристической компании.</p></div></section>`;
}
function destinations() {
  return `${hero('Направления','Выбирай континент, исследуй регионы и открывай страны — у каждого места своя история.')}<section class="section white"><div class="container"><div class="tabs"><button class="tab active" data-continent="asia">Азия</button><button class="tab" data-continent="europe">Европа</button></div><div id="regionArea">${renderRegions('asia')}</div></div></section>`;
}
function countryPage(id) {
  const c = getCountry(id);
  if (!c) return notFound();
  const ps = places.filter(p=>p.country===id);
  const ts = tours.filter(t=>t.country===id);
  return `${hero(c.name, c.desc, 'Направления')}<section class="section white"><div class="container"><div class="countryintro"><div class="copy"><p class="eyebrow">ЗНАКОМСТВО СО СТРАНОЙ</p><h2 class="contentheading">${c.flag} ${esc(c.name)} — больше, чем точка на карте</h2><p>${esc(c.desc)}</p><p>Выбирай экскурсию на один день или собирай полноценное путешествие из нескольких маршрутов. В каждой карточке места есть описание, историческая справка и ссылка на видео или виртуальный материал.</p><div class="facts"><div class="fact"><strong>${esc(c.capital)}</strong><span>Столица</span></div><div class="fact"><strong>${esc(c.currency)}</strong><span>Валюта</span></div><div class="fact"><strong>${esc(c.language)}</strong><span>Язык</span></div><div class="fact"><strong>${esc(c.season)}</strong><span>Лучший сезон</span></div></div><a class="btn btn-dark" href="#tours/${id}">Подобрать туры ↗</a></div>${imageTag(c.img,c.name,1000,'','eager')}</div></div></section><section class="section soft"><div class="container"><div class="sectionhead"><div><p class="eyebrow">ГОРОДА И ДОСТОПРИМЕЧАТЕЛЬНОСТИ</p><h2>Что посмотреть в ${esc(c.name)}</h2></div><p>Нажми на карточку, чтобы открыть отдельную страницу места, посмотреть видео и прочитать историю.</p></div><div class="cards">${ps.map(p=>`<a class="destcard" href="#place/${p.id}">${imageTag(p.img,p.name,650)}<div class="destcontent"><span class="kicker">${esc(p.type)}</span><h3>${esc(p.name)}</h3><p>${esc(p.city)} · ${esc(p.subtitle)}</p><span class="arrow">↗</span></div></a>`).join('')}</div></div></section><section class="section white"><div class="container"><div class="sectionhead"><div><p class="eyebrow">ГОТОВЫЕ МАРШРУТЫ</p><h2>Туры по стране</h2></div><a class="textlink" href="#tours/${id}">Все туры →</a></div><div class="tourgrid">${ts.map(tourCard).join('')}</div><div class="notice">Цены показаны для учебного примера и не являются коммерческим предложением. Перед настоящим бронированием их необходимо подтвердить.</div></div></section>`;
}
function videoHref(p) {
  if (p.videoId) return `https://www.youtube.com/watch?v=${p.videoId}`;
  if (p.videoUrl) return p.videoUrl;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(p.video || p.name + ' travel video')}`;
}
function videoSection(p) {
  if (p.videoId) {
    return `<div class="video-embed"><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/${p.videoId}?rel=0" title="Видео о месте: ${esc(p.name)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><a class="videolink" href="${videoHref(p)}" target="_blank" rel="noopener"><span class="play">▶</span><span><strong>Открыть видео отдельно</strong><small>Видео о ${esc(p.name)} · YouTube</small></span><span style="margin-left:auto">↗</span></a>`;
  }
  const target = videoHref(p);
  const label = p.videoUrl ? 'Открыть видео или виртуальный материал' : 'Смотреть видео на YouTube';
  const sub = p.videoUrl ? 'Официальная страница достопримечательности с видео или фильмом' : 'Подборка видео о конкретном месте';
  return `<a class="video-feature" href="${target}" target="_blank" rel="noopener">${imageTag(p.img,p.name,1000)}<span class="video-feature-shade"></span><span class="video-feature-play">▶</span><span class="video-feature-caption"><strong>${label}</strong><small>${sub}</small></span><span class="video-feature-arrow">↗</span></a>`;
}
function placePage(id) {
  const p = getPlace(id);
  if (!p) return notFound();
  const c = getCountry(p.country);
  const ts = tours.filter(t=>t.place===id);
  const minPrice = ts.length ? Math.min(...ts.map(t=>t.price)) : p.price;
  return `${hero(p.name,p.subtitle,`${c.name}　›　${p.city}`)}<section class="section white"><div class="container"><div class="detailgrid"><div>${imageTag(p.img,p.name,1200,'mainphoto','eager')}<div class="thumbs">${imageTag(p.img,p.name+' — фото 1',350)}${imageTag(c.img,c.name+' — фотография страны',350)}${imageTag(p.img,p.name+' — фото 2',350)}</div><div class="story"><h3>Об этом месте</h3><p>${esc(p.description)}</p><p><b>Где находится:</b> ${esc(p.city)}, ${esc(c.name)}.</p></div><div class="story"><h3>История места</h3><p>${esc(p.history)}</p></div><div class="video-section"><p class="eyebrow">ПОСМОТРИ ПЕРЕД ПОЕЗДКОЙ</p><h2 class="contentheading">Видео о месте</h2>${videoSection(p)}</div><div class="notice">Информация подготовлена для учебного туристического проекта. Перед реальной поездкой проверь сезонность, режим доступа, визовые требования и местные правила.</div></div><aside class="booking"><p class="eyebrow">ОТКРОЙ ЭТО МЕСТО</p><h2>${esc(p.name)}</h2><p style="font-size:11px;color:var(--muted)">${esc(p.city)} · ${esc(p.type)}</p><div class="price">от $${minPrice} <small>/ человек</small></div><p style="font-size:12px;color:var(--muted)">Можно выбрать отдельную экскурсию или объединить несколько мест в индивидуальную программу.</p><a class="btn btn-dark" style="width:100%" href="#contacts">Запросить бронирование ↗</a><hr style="border:0;border-top:1px solid var(--line);margin:22px 0"><strong style="font-size:12px">Туры по месту</strong>${ts.map(t=>`<a class="videolink" href="#tour/${t.id}"><span><strong>${esc(t.name)}</strong><small>${esc(t.days)} · от $${t.price}</small></span><span style="margin-left:auto">→</span></a>`).join('')}</aside></div></div></section>`;
}
function toursPage(cid = '') {
  const c = cid ? getCountry(cid) : null;
  let ts = cid ? tours.filter(t=>t.country===cid) : tours;
  const queryString = location.hash.includes('?') ? location.hash.split('?').slice(1).join('?') : '';
  const params = new URLSearchParams(queryString);
  const duration = params.get('duration') || 'all';
  const style = params.get('style') || 'all';
  if (duration === '1') ts = ts.filter(t=>/^1/.test(t.days));
  if (duration === '2') ts = ts.filter(t=>!/^1/.test(t.days));
  if (style === 'nature') ts = ts.filter(t=>/природ|озер|гор|каньон|парк|поход|море|пляж/i.test(t.name+' '+t.desc+' '+t.type));
  if (style === 'culture') ts = ts.filter(t=>/истор|культур|музей|архитект|город|плов|дворец|собор|колизей|регистан/i.test(t.name+' '+t.desc+' '+t.type));
  return `${hero(c ? 'Туры: '+c.name : 'Туры и маршруты',c ? `Однодневные, двухдневные и многодневные поездки по направлению ${c.name}.` : 'Выбирай формат путешествия — от короткой прогулки до нескольких дней с гидом.','Туры')}<section class="section white"><div class="container"><div class="filters"><button class="tab ${duration==='all'?'active':''}" data-filter="all">Все туры</button><button class="tab ${duration==='1'?'active':''}" data-filter="Однодневный">Однодневные</button><button class="tab ${duration==='2'?'active':''}" data-filter="Двухдневный">Двухдневные и длиннее</button></div><div class="tourgrid" id="tourGrid">${ts.map(tourCard).join('') || '<div class="empty">По этому фильтру пока нет маршрутов. <a class="textlink" href="#tours">Посмотреть все туры ↗</a></div>'}</div><div class="notice">Цены указаны как демонстрационные учебные примеры в долларах США на одного человека. Реальная стоимость, даты и состав услуг должны быть подтверждены организатором.</div><a class="btn btn-dark" href="#contacts">Собрать индивидуальный тур ↗</a></div></section>`;
}
function tourPage(id) {
  const t = getTour(id);
  if (!t) return notFound();
  const p = getPlace(t.place), c = getCountry(t.country);
  return `${hero(t.name,t.desc,`${c.name}　›　Туры`)}<section class="section white"><div class="container"><div class="detailgrid"><div>${imageTag(p.img,t.name,1200,'mainphoto','eager')}<div class="story"><h3>Что тебя ждёт</h3><p>${esc(t.desc)} Вместе с гидом можно познакомиться с природой, культурой и особенностями региона. Точная программа согласовывается с учётом погоды и пожеланий группы.</p></div><h2 class="contentheading" style="margin-top:30px">Пример программы</h2><div class="copy"><ul><li>Встреча с гидом в согласованном месте.</li><li>Переезд к основной локации и остановки по маршруту.</li><li>Экскурсия, свободное время и фотографии.</li><li>Возвращение в согласованную точку.</li></ul><h3>Что может входить в стоимость?</h3><ul><li>Сопровождение гида.</li><li>Транспорт, если он указан в подтверждённой программе.</li><li>Организация маршрута.</li><li>Питание, входные билеты и проживание уточняются индивидуально.</li></ul></div><a class="videolink" href="#place/${p.id}"><span class="play">↗</span><span><strong>О месте: ${esc(p.name)}</strong><small>История и видео на странице достопримечательности</small></span></a></div><aside class="booking"><p class="eyebrow">ДЕТАЛИ ТУРА</p><h2>${esc(t.name)}</h2><div class="price">$${t.price} <small>/ человек</small></div><div class="facts"><div class="fact"><strong>${esc(t.days)}</strong><span>Длительность</span></div><div class="fact"><strong>${esc(t.group)}</strong><span>Группа</span></div><div class="fact"><strong>${esc(t.transport)}</strong><span>Транспорт</span></div><div class="fact"><strong>${esc(c.name)}</strong><span>Страна</span></div></div><form class="bookingform" data-booking><div class="field"><label>Дата поездки</label><input name="date" type="date" required></div><div class="field"><label>Количество человек</label><select name="people"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select></div><div class="field"><label>Телефон / WhatsApp</label><input name="phone" type="tel" placeholder="+996 ..." required></div><div class="field"><label>Email</label><input name="email" type="email" placeholder="name@gmail.com" required></div><button class="btn btn-dark" type="submit">Подготовить запрос ↗</button><p class="note">Демо-форма: заявка не отправляется на сервер и не создаёт реальную бронь.</p></form></aside></div></div></section>`;
}
function guidesPage() {
  return `${hero('Наши гиды','Знакомься с командами маршрутов — от горных прогулок до экскурсий по архитектуре Европы.')}<section class="section white"><div class="container"><div class="guidegrid">${guides.map(guideCard).join('')}</div><div class="notice">Профили, рейтинги и опыт указаны как учебные примеры. Фотографии портретные и не подтверждают личность реальных гидов. Для коммерческого сайта замените их согласованными фотографиями, проверенной биографией и контактами.</div></div></section>`;
}
function aboutPage() {
  return `${hero('О Nomad Travel','Мы верим, что лучшие путешествия соединяют красивые места, местных людей и уважение к культуре.')}<section class="section white"><div class="container"><div class="countryintro"><div class="copy"><p class="eyebrow">НАША ИДЕЯ</p><h2 class="contentheading">Путешествовать глубже, а не просто дальше</h2><p>Nomad Travel — концепция туристического сервиса для людей, которые хотят узнавать страны через природу, историю и общение с местными гидами.</p><p>Можно выбрать однодневную экскурсию, поездку на выходные или многодневный маршрут. Каждый путешественник может собрать собственную программу из нескольких мест.</p><p>Наша философия — небольшие группы, понятная информация, уважение к окружающей среде и живые истории каждой локации.</p></div>${imageTag('photo-1464822759023-fed622ff2c3b','Горный пейзаж',1000)}</div><div class="cards" style="margin-top:40px"><div class="fact"><img class="local-icon" src="images/globe.svg" alt="Глобус"><strong>Маршруты со смыслом</strong><span>Популярные места и культурные открытия.</span></div><div class="fact"><img class="local-icon" src="images/mountains.svg" alt="Горы"><strong>Путешествия в природу</strong><span>От горных троп до морских побережий.</span></div><div class="fact"><img class="local-icon" src="images/compass.svg" alt="Компас"><strong>Свобода выбора</strong><span>Короткие экскурсии или большая поездка.</span></div></div></div></section>`;
}
function contactsPage() {
  return `${hero('Контакты','Расскажи, куда хочешь поехать — поможем составить маршрут и выбрать формат путешествия.')}<section class="section white"><div class="container"><div class="contactgrid"><div><p class="eyebrow">МЫ НА СВЯЗИ</p><h2 class="contentheading">Давай спланируем<br>твоё путешествие</h2><p style="font-size:13px;color:var(--muted);margin-top:18px">Укажи направление, даты и удобный способ связи.</p><div class="contactlist"><div class="contactitem"><span class="contacticon">☎</span><div><strong>Телефон / WhatsApp</strong><p>+996 700 123 456 (пример)</p></div></div><div class="contactitem"><span class="contacticon">✉</span><div><strong>Email</strong><p>nomadtravel.example@gmail.com (пример)</p></div></div><div class="contactitem"><span class="contacticon">⌖</span><div><strong>Город</strong><p>Бишкек, Кыргызстан</p></div></div><div class="contactitem"><span class="contacticon">◷</span><div><strong>Время ответа</strong><p>Условный график: 09:00–19:00</p></div></div></div></div><form id="contactForm" class="form"><div class="field"><label for="contactName">Имя</label><input id="contactName" name="name" required placeholder="Ваше имя"></div><div class="field"><label for="contactPhone">Телефон</label><input id="contactPhone" name="phone" required type="tel" placeholder="+996 ..."></div><div class="field full"><label for="contactEmail">Email</label><input id="contactEmail" name="email" type="email" required placeholder="name@gmail.com"></div><div class="field"><label for="contactCountry">Страна</label><select id="contactCountry" name="country">${countries.map(c=>`<option>${esc(c.name)}</option>`).join('')}<option>Другая страна</option></select></div><div class="field"><label for="contactDuration">Формат</label><select id="contactDuration" name="duration"><option>Однодневный тур</option><option>2 дня / выходные</option><option>Многодневный тур</option><option>Индивидуальная программа</option></select></div><div class="field full"><label for="contactMessage">Пожелания</label><textarea id="contactMessage" name="message" placeholder="Даты, количество человек, места, которые хотите увидеть..."></textarea></div><p class="note">Учебный проект: форма проверяет поля в браузере, но не отправляет данные по email. Не вводи реальные персональные данные на демонстрационном сайте.</p><button class="btn btn-dark" type="submit">Подготовить запрос ↗</button></form></div></div></section>`;
}
function notFound() {
  return `<section class="notfound"><p class="eyebrow">СТРАНИЦА НЕ НАЙДЕНА</p><h1>Кажется, мы свернули не туда</h1><p>Вернись на главную и выбери направление.</p><a class="btn btn-dark" href="#home">На главную ↗</a></section>`;
}
function render() {
  const raw = location.hash.slice(1) || 'home';
  const parts = raw.split('/');
  const route = parts[0];
  const id = (parts[1] || '').split('?')[0];
  let output;
  switch (route) {
    case 'home': output = home(); break;
    case 'destinations': output = destinations(); break;
    case 'country': output = countryPage(id); break;
    case 'place': output = placePage(id); break;
    case 'tours': output = toursPage(id); break;
    case 'tour': output = tourPage(id); break;
    case 'guides': output = guidesPage(); break;
    case 'about': output = aboutPage(); break;
    case 'contacts': output = contactsPage(); break;
    default: output = notFound();
  }
  app.innerHTML = output;
  nav.classList.remove('open');
  menuToggle.textContent = '☰';
  menuToggle.setAttribute('aria-expanded','false');
  document.querySelectorAll('#mainNav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+route));
  if (route === 'home' || route === 'destinations') setupRegions('asia');
  setupInteractions();
  window.scrollTo(0,0);
}
function setupRegions(continent) {
  const area = document.getElementById('regionArea');
  if (!area) return;
  area.innerHTML = renderRegions(continent);
  document.querySelectorAll('[data-continent]').forEach(button=>{
    button.classList.toggle('active',button.dataset.continent===continent);
    button.onclick=()=>{
      document.querySelectorAll('[data-continent]').forEach(tab=>tab.classList.toggle('active',tab===button));
      setupRegions(button.dataset.continent);
    };
  });
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(()=>toast.classList.remove('show'),4000);
}
function setupInteractions() {
  const quickSearch = document.getElementById('quickSearch');
  if (quickSearch) quickSearch.onsubmit = event => {
    event.preventDefault();
    const countryId = document.getElementById('searchCountry').value;
    const duration = document.getElementById('searchDuration').value;
    const style = document.getElementById('searchStyle').value;
    location.hash = `#tours/${countryId}?duration=${encodeURIComponent(duration)}&style=${encodeURIComponent(style)}`;
  };
  document.querySelectorAll('[data-filter]').forEach(button=>button.onclick=()=>{
    document.querySelectorAll('[data-filter]').forEach(tab=>tab.classList.toggle('active',tab===button));
    const key = button.dataset.filter;
    document.querySelectorAll('#tourGrid .tourcard').forEach(card=>{
      const isOneDay = /\b1\s*день\b/i.test(card.querySelector('.meta')?.innerText || '');
      card.style.display = key==='all' || (key==='Однодневный' && isOneDay) || (key==='Двухдневный' && !isOneDay) ? 'flex' : 'none';
    });
  });
  document.querySelectorAll('[data-booking]').forEach(form=>form.onsubmit=event=>{
    event.preventDefault();
    const data = new FormData(form);
    showToast(`Демо-запрос подготовлен для ${data.get('people')} чел. Данные не отправлены.`);
    form.reset();
  });
  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.onsubmit = event=>{
    event.preventDefault();
    showToast(`Спасибо, ${contactForm.elements.name.value.trim()}! Это учебная форма: сообщение не отправлено.`);
    contactForm.reset();
  };
  document.querySelectorAll('[data-guide]').forEach(button=>button.onclick=()=>{
    const guideName = button.dataset.guide;
    location.hash = '#contacts';
    setTimeout(()=>{
      const message = document.querySelector('[name="message"]');
      if (message) message.value = `Хочу узнать больше о гиде ${guideName}.`;
    },100);
  });
}
menuToggle.onclick = ()=>{
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.textContent = open ? '×' : '☰';
};
nav.querySelectorAll('a').forEach(link=>link.onclick=()=>{
  nav.classList.remove('open');
  menuToggle.textContent='☰';
  menuToggle.setAttribute('aria-expanded','false');
});
window.addEventListener('hashchange',render);
render();
