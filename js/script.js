window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) { splash.style.opacity = '0'; setTimeout(() => splash.style.display = 'none', 1000); }
    }, 2000); 
});

// ========================================================
// TÜRKİYE 81 İL VE İLÇE MOTORU
// ========================================================
const turkiyeData = {
    "Adana": ["Aladağ","Ceyhan","Çukurova","Kozan","Sarıçam","Seyhan","Yüreğir","Diğer"],
    "Ankara": ["Altındağ","Çankaya","Etimesgut","Gölbaşı","Keçiören","Mamak","Sincan","Yenimahalle","Diğer"],
    "Antalya": ["Alanya","Demre","Kaş","Kemer","Kepez","Konyaaltı","Manavgat","Muratpaşa","Diğer"],
    "Bursa": ["Gemlik","İnegöl","Mudanya","Nilüfer","Osmangazi","Yıldırım","Diğer"],
    "Hatay": ["Antakya","Arsuz","Belen","Defne","Dörtyol","İskenderun","Kırıkhan","Reyhanlı","Samandağ","Diğer"],
    "İstanbul": ["Ataşehir","Avcılar","Bakırköy","Beşiktaş","Beylikdüzü","Beyoğlu","Esenyurt","Kadıköy","Kartal","Küçükçekmece","Maltepe","Pendik","Sarıyer","Şişli","Ümraniye","Üsküdar","Diğer"],
    "İzmir": ["Balçova","Bayraklı","Bornova","Buca","Çeşme","Çiğli","Gaziemir","Karabağlar","Karşıyaka","Konak","Urla","Diğer"],
    "Kocaeli": ["Başiskele","Çayırova","Darıca","Derince","Gebze","Gölcük","İzmit","Kartepe","Körfez","Diğer"],
    "Muğla": ["Bodrum","Dalaman","Datça","Fethiye","Marmaris","Menteşe","Milas","Ortaca","Diğer"]
};

const tumIller = ["Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"];

tumIller.forEach(il => { if(!turkiyeData[il]) turkiyeData[il] = ["Merkez", "Diğer İlçeler"]; });

const filterCity = document.getElementById('filterCity');
const filterDistrict = document.getElementById('filterDistrict');

if(filterCity) {
    tumIller.sort().forEach(il => {
        const opt = document.createElement('option');
        opt.value = il; opt.textContent = il;
        filterCity.appendChild(opt);
    });

    filterCity.addEventListener('change', function() {
        filterDistrict.innerHTML = '<option value="Hepsi">İlçe Seçin</option>';
        const secilenIl = this.value;
        if(secilenIl !== "Hepsi" && turkiyeData[secilenIl]) {
            turkiyeData[secilenIl].forEach(ilce => {
                const opt = document.createElement('option');
                opt.value = ilce; opt.textContent = ilce;
                filterDistrict.appendChild(opt);
            });
        }
    });
}

// ========================================================
// AUTH (YETKİLENDİRME) SİSTEMİ
// ========================================================
let isLoggedIn = false;
const authModal = document.getElementById('authModal');
const loginNavBtn = document.getElementById('loginNavBtn');

document.getElementById('loginNavBtn')?.addEventListener('click', (e) => { e.preventDefault(); if(!isLoggedIn) authModal.style.display = 'flex'; });
document.getElementById('postAdBtn')?.addEventListener('click', (e) => { e.preventDefault(); checkAuthForSeller(); });
document.getElementById('floatingAdBtn')?.addEventListener('click', (e) => { e.preventDefault(); checkAuthForSeller(); });
document.getElementById('closeAuthBtn')?.addEventListener('click', () => { authModal.style.display = 'none'; });

function checkAuthForSeller() {
    if(isLoggedIn) window.location.href = "pages/seller-panel.html";
    else { alert("İlan vermek için lütfen önce sisteme giriş yapın."); authModal.style.display = 'flex'; }
}

function switchAuthTab(tab) {
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
    const tabs = document.querySelectorAll('.auth-tab-btn');
    tabs[0].classList.toggle('active', tab === 'login');
    tabs[1].classList.toggle('active', tab === 'register');
}

function executeLogin() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    if(!email || !pass) { alert("Lütfen E-posta ve Şifrenizi eksiksiz girin."); return; }
    const isim = email.split('@')[0]; 
    finalizeLogin(isim.charAt(0).toUpperCase() + isim.slice(1));
}

function executeRegister() {
    const name = document.getElementById('regName').value;
    if(!name) { alert("Lütfen tüm kayıt bilgilerini doldurun."); return; }
    finalizeLogin(name);
}

function finalizeLogin(userName) {
    isLoggedIn = true;
    authModal.style.display = 'none';
    loginNavBtn.innerText = `👤 Hesabım (${userName})`;
    loginNavBtn.style.color = "#4cd137";
    loginNavBtn.style.fontWeight = "bold";
    alert(`Hoş geldin ${userName}! Artık İlan Ver paneline erişebilirsin.`);
}

// ========================================================
// SAYFA YÖNLENDİRME (SPA - History API)
// ========================================================
const mainCategories = document.getElementById('main-categories');
const listingsLayout = document.getElementById('listings-layout');
const selectedMainTitle = document.getElementById('selectedMainTitle');
let currentMainType = ''; 

document.querySelectorAll('.main-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentMainType = btn.getAttribute('data-main'); 
        navigateTo('listings', currentMainType);
    });
});

document.getElementById('backToMainBtn')?.addEventListener('click', () => navigateTo('home'));

function navigateTo(view, type = '') {
    if(view === 'listings') {
        mainCategories.style.display = 'none';
        listingsLayout.style.display = 'flex';
        selectedMainTitle.innerText = `${type.toUpperCase()} İLANLAR`;
        document.getElementById('listingsContainer').innerHTML = '<h3 style="color:white; margin:auto; padding: 50px;">Lütfen soldan bir alt kategori seçin.</h3>';
        history.pushState({view: 'listings', type: type}, '', `?kategori=${type}`);
    } else {
        listingsLayout.style.display = 'none';
        mainCategories.style.display = 'flex';
        currentMainType = '';
        history.pushState({view: 'home'}, '', window.location.pathname);
    }
}

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.view === 'listings') {
        currentMainType = e.state.type;
        mainCategories.style.display = 'none';
        listingsLayout.style.display = 'flex';
        selectedMainTitle.innerText = `${currentMainType.toUpperCase()} İLANLAR`;
    } else {
        listingsLayout.style.display = 'none';
        mainCategories.style.display = 'flex';
    }
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        content.style.display = content.style.display === "flex" ? "none" : "flex";
    });
});

document.querySelectorAll('.sub-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const subType = link.getAttribute('data-type');
        loadListings(`${currentMainType}-${subType}`);
    });
});

// ========================================================
// VERİTABANI VE İLAN YÖNETİMİ
// ========================================================
const realEstateDB = [
    { id: 101, type: "satilik-daire", title: "Kadıköy Merkezde Deniz Manzaralı 3+1", price: 7500000, city: "İstanbul", district: "Kadıköy", rooms: "3+1", m2Brut: 135, heating: "Doğalgaz (Kombi)", seller: "Emlak360 Kurumsal", date: "05.10.2026", desc: "Denize yürüme mesafesinde, masrafsız lüks daire.", premium: true, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"] },
    { id: 102, type: "satilik-villa", title: "Bodrum Yalıkavak Özel Havuzlu Villa", price: 25000000, city: "Muğla", district: "Bodrum", rooms: "5+2", m2Brut: 350, heating: "Yerden Isıtma", seller: "Süleyman Bey", date: "01.10.2026", desc: "Müstakil bahçeli, ebeveyn banyolu ultra lüks villa.", premium: true, images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"] },
    { id: 103, type: "satilik-daire", title: "İskenderun Sahilde Fırsat 2+1", price: 3200000, city: "Hatay", district: "İskenderun", rooms: "2+1", m2Brut: 110, heating: "Doğalgaz (Kombi)", seller: "Alper Kılınç", date: "03.10.2026", desc: "Sahil bandına 100 metre mesafede yatırımlık daire.", premium: false, images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"] },
    { id: 201, type: "kiralik-daire", title: "Beşiktaş Çarşıya Yakın Öğrenciye Uygun 1+1", price: 25000, city: "İstanbul", district: "Beşiktaş", rooms: "1+1", m2Brut: 65, heating: "Doğalgaz (Soba)", seller: "Ahmet Yılmaz", date: "04.10.2026", desc: "Ulaşıma çok yakın, eşyalı temiz daire.", premium: false, images: ["https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=800"] },
    { id: 202, type: "kiralik-rezidans", title: "Ankara Çankaya Lüks Eşyalı Rezidans", price: 45000, city: "Ankara", district: "Çankaya", rooms: "2+1", m2Brut: 100, heating: "Merkezi Isıtma", seller: "VIP Emlak", date: "02.10.2026", desc: "Güvenlikli, kapalı otoparklı 7/24 hizmet sunan rezidans.", premium: true, images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"] },
    { id: 203, type: "kiralik-mustakil", title: "Arsuz Gökmeydan Bahçeli Kiralık Ev", price: 18000, city: "Hatay", district: "Arsuz", rooms: "3+1", m2Brut: 140, heating: "Klima", seller: "Zeynep Hanım", date: "05.10.2026", desc: "Geniş bahçeli, aileye uygun kiralık müstakil ev.", premium: false, images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"] },
    { id: 301, type: "satilik-ofis", title: "Levent Plaza Katı Devren Satılık Ofis", price: 35000000, city: "İstanbul", district: "Levent", rooms: "Bölmesiz", m2Brut: 250, heating: "VRV Klima Sistemi", seller: "Kurumsal Danışmanlık", date: "28.09.2026", desc: "A Sınıfı plazada, toplantı salonlu modern ofis.", premium: true, images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"] },
    { id: 302, type: "satilik-imarli", title: "İzmir Urla'da Deniz Gören %30 İmarlı Arsa", price: 8500000, city: "İzmir", district: "Urla", rooms: "Arsa", m2: 1200, zoning: "Konut", seller: "Arsa Ofisi", date: "05.10.2026", desc: "Villa yapımına uygun, yolu açılmış süper konumda arsa.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 303, type: "satilik-tarla", title: "Antakya Altınözü Yolu Üzeri Zeytinlik", price: 1200000, city: "Hatay", district: "Antakya", rooms: "Tarla", m2: 4500, zoning: "Tarla", seller: "Köyden Satılık", date: "01.10.2026", desc: "İçinde 50 adet yetişkin zeytin ağacı bulunan verimli tarla.", premium: false, images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"] },
    { id: 401, type: "kiralik-dukkan", title: "İskenderun Pac Meydanında Köşe Dükkan", price: 65000, city: "Hatay", district: "İskenderun", rooms: "Dükkan", m2Brut: 90, heating: "Klima", seller: "Mülk Sahibi", date: "05.10.2026", desc: "Yaya trafiğinin en yoğun olduğu caddede, çift cepheli.", premium: true, images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800"] },
    { id: 402, type: "kiralik-depo", title: "Gebze OSB Yakını Kiralık Tır Yanaşır Depo", price: 150000, city: "Kocaeli", district: "Gebze", rooms: "Açık Alan", m2Brut: 1500, heating: "Sanayi Tipi", seller: "Lojistik Emlak", date: "03.10.2026", desc: "Yüksek tavan, rampalı ve güvenlikli depo alanı.", premium: false, images: ["https://images.unsplash.com/photo-1580828369019-2238b6d778fe?w=800"] }
];

const approvedFromAdmin = JSON.parse(localStorage.getItem('approvedListings'));
if (approvedFromAdmin && approvedFromAdmin.length > 0) {
    approvedFromAdmin.forEach(ilan => { if (!realEstateDB.find(item => item.id === ilan.id)) realEstateDB.push(ilan); });
}

function renderListings(dataArray) {
    if(!listingsContainer) return;
    listingsContainer.innerHTML = ''; 
    
    let exactMatches = dataArray.filter(item => item.type.startsWith(currentMainType));

    if(exactMatches.length === 0) {
        listingsContainer.innerHTML = `<h3 style="color:white; margin:auto; padding:50px;">Aradığınız kriterlere uygun ${currentMainType} ilan bulunamadı.</h3>`;
        return;
    }

    const sortedArray = exactMatches.sort((a, b) => (b.premium === true) - (a.premium === true));

    sortedArray.forEach(item => {
        const card = document.createElement('div');
        card.className = item.premium ? 'listing-card premium-card' : 'listing-card';
        const formattedPrice = typeof item.price === 'number' ? item.price.toLocaleString('tr-TR') : item.price;

        card.innerHTML = `
            ${item.premium ? '<div class="premium-badge">⭐ Öne Çıkan</div>' : ''}
            <img src="${item.images[0]}" alt="Mülk" loading="lazy">
            <h3>${item.title}</h3>
            <p>📍 ${item.city} / ${item.district} | 🛏️ ${item.rooms}</p>
            <p>${formattedPrice} TL</p>
            <button class="virtual-tour-btn" style="background:#0984e3; border-color:#0984e3;" onclick="openDetailModal(${item.id})">🔍 İlanı İncele</button>
        `;
        listingsContainer.appendChild(card);
    });
}

function loadListings(type) {
    const filteredByCategory = realEstateDB.filter(item => item.type === type);
    renderListings(filteredByCategory);
}

document.getElementById('executeSearchBtn')?.addEventListener('click', () => {
    const city = document.getElementById('filterCity').value;
    const district = document.getElementById('filterDistrict').value;
    const room = document.getElementById('filterRoom').value;
    const minP = parseFloat(document.getElementById('filterMin').value) || 0;
    const maxP = parseFloat(document.getElementById('filterMax').value) || Infinity;

    const results = realEstateDB.filter(item => {
        if(city !== "Hepsi" && item.city !== city) return false;
        if(district !== "Hepsi" && item.district !== district) return false;
        if(room !== "Hepsi" && item.rooms !== room) return false;
        let numPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/\D/g,'')) : item.price;
        if(numPrice < minP || numPrice > maxP) return false;
        return true; 
    });
    renderListings(results);
});

// ========================================================
// İLAN DETAY MODALI
// ========================================================
const detailModal = document.getElementById('detailModal');

function openDetailModal(id) {
    const listing = realEstateDB.find(item => item.id === id);
    if(listing) {
        document.getElementById('detailImage').src = listing.images[0];
        document.getElementById('detailTitle').innerText = listing.title;
        document.getElementById('detailLocation').innerText = `📍 ${listing.city} / ${listing.district} ${listing.neighborhood ? '/ ' + listing.neighborhood : ''}`;
        document.getElementById('detailPrice').innerText = (typeof listing.price === 'number' ? listing.price.toLocaleString('tr-TR') : listing.price) + " TL";
        document.getElementById('detailDesc').innerText = listing.desc || "Satıcı açıklama girmemiştir.";
        
        const formatType = listing.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const specsContainer = document.getElementById('dynamicSpecsContainer');
        
        let specsHTML = `
            <div class="spec-row"><span>İlan No:</span> <strong>${listing.id}</strong></div>
            <div class="spec-row"><span>İlan Tarihi:</span> <strong>${listing.date || new Date().toLocaleDateString('tr-TR')}</strong></div>
            <div class="spec-row"><span>Kategori:</span> <strong>${formatType}</strong></div>
            <div class="spec-row"><span>Kimden:</span> <strong style="color: #0984e3;">${listing.seller || "Emlak360 Üyesi"}</strong></div>
        `;

        if (listing.type.includes('imarli') || listing.type.includes('tarla') || listing.type.includes('zeytinlik')) {
            specsHTML += `
                <div class="spec-row"><span>m²:</span> <strong>${listing.m2 || 'Belirtilmemiş'}</strong></div>
                <div class="spec-row"><span>İmar Durumu:</span> <strong>${listing.zoning || 'Belirtilmemiş'}</strong></div>
                <div class="spec-row"><span>Ada / Parsel:</span> <strong>${listing.ada || '-'} / ${listing.parsel || '-'}</strong></div>
                <div class="spec-row"><span>Tapu Durumu:</span> <strong>${listing.deedStatus || 'Belirtilmemiş'}</strong></div>
            `;
        } else {
            specsHTML += `
                <div class="spec-row"><span>Brüt / Net m²:</span> <strong>${listing.m2Brut || listing.m2 || '-'} / ${listing.m2Net || '-'}</strong></div>
                <div class="spec-row"><span>Oda Sayısı:</span> <strong>${listing.rooms || '-'}</strong></div>
                <div class="spec-row"><span>Bina Yaşı:</span> <strong>${listing.age || '-'}</strong></div>
                <div class="spec-row"><span>Bulunduğu Kat:</span> <strong>${listing.floor || '-'}</strong></div>
                <div class="spec-row"><span>Isıtma:</span> <strong>${listing.heating || '-'}</strong></div>
                <div class="spec-row"><span>Banyo Sayısı:</span> <strong>${listing.baths || '-'}</strong></div>
                <div class="spec-row"><span>Cephe:</span> <strong>${listing.facade || '-'}</strong></div>
                <div class="spec-row"><span>Eşyalı:</span> <strong>${listing.furnished || 'Hayır'}</strong></div>
            `;
        }
        
        specsContainer.innerHTML = specsHTML;
        detailModal.style.display = 'flex';
    }
}
function closeDetailModal() { detailModal.style.display = 'none'; }

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const contextMenu = document.getElementById("customContextMenu");
    if(!contextMenu) return;
    let x = e.offsetX, y = e.offsetY;
    let winW = window.innerWidth, winH = window.innerHeight;
    let cmW = contextMenu.offsetWidth, cmH = contextMenu.offsetHeight;
    contextMenu.style.left = `${x > winW - cmW ? winW - cmW : x}px`;
    contextMenu.style.top = `${y > winH - cmH ? winH - cmH : y}px`;
    contextMenu.style.display = "block";
});
document.addEventListener("click", () => {
    const cm = document.getElementById("customContextMenu");
    if(cm) cm.style.display = "none";
});

// ========================================================
// ISI HARİTASI (HEATMAP) MOTORU
// ========================================================
let heatMapInstance = null;

function openHeatmap() {
    document.getElementById('heatmapModal').style.display = 'flex';

    if (!heatMapInstance) {
        heatMapInstance = L.map('turkeyMap').setView([39.0, 35.0], 6);

        // KESİN ÇÖZÜM: Standart ve açık kaynaklı OpenStreetMap katmanı (API Key istemez, her zaman çalışır)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(heatMapInstance);

        // Arsa Yatırım Sıcak Bölgeleri (Hotspots)
        const hotSpots = [
            { lat: 41.07, lng: 28.05, radius: 35000, color: '#ff4757' }, // İstanbul
            { lat: 38.32, lng: 26.76, radius: 30000, color: '#ff4757' }, // İzmir / Urla
            { lat: 36.40, lng: 35.85, radius: 25000, color: '#ff4757' }, // Hatay / Arsuz
            { lat: 39.79, lng: 32.80, radius: 28000, color: '#ffa502' }, // Ankara / Gölbaşı
            { lat: 36.89, lng: 30.71, radius: 25000, color: '#ffa502' }, // Antalya
            { lat: 40.18, lng: 29.06, radius: 20000, color: '#eccc68' }, // Bursa
            { lat: 37.00, lng: 35.32, radius: 20000, color: '#eccc68' }  // Adana
        ];

        hotSpots.forEach(spot => {
            L.circle([spot.lat, spot.lng], {
                radius: spot.radius * 1.5, color: 'transparent', fillColor: spot.color, fillOpacity: 0.3, className: 'heat-blur'
            }).addTo(heatMapInstance);

            L.circle([spot.lat, spot.lng], {
                radius: spot.radius * 0.7, color: 'transparent', fillColor: spot.color, fillOpacity: 0.7, className: 'heat-blur-intense'
            }).addTo(heatMapInstance);
        });
    }

    setTimeout(() => { heatMapInstance.invalidateSize(); }, 300);
}

function closeHeatmap() {
    document.getElementById('heatmapModal').style.display = 'none';
}