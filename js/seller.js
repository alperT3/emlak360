let currentTransactionType = 'satilik'; 

function nextStep(stepNumber) {
    document.querySelectorAll('.wizard-step-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    document.getElementById(`step-${stepNumber}-indicator`).classList.add('active');
}

function prevStep(stepNumber) { 
    nextStep(stepNumber); 
}

// Butonlara işlevsellik kazandıran fonksiyon
function setTransactionType(type) {
    currentTransactionType = type;
    document.querySelectorAll('.trans-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${type}`).classList.add('active');
}

function updateDynamicFields() {
    const kategori = document.getElementById('ilanKategori').value;
    const binaFields = document.getElementById('binaFields');
    const arsaFields = document.getElementById('arsaFields');

    if(kategori === 'imarli' || kategori === 'tarla' || kategori === 'zeytinlik') {
        binaFields.style.display = 'none';
        arsaFields.style.display = 'block';
    } else {
        binaFields.style.display = 'block';
        arsaFields.style.display = 'none';
    }
}

function submitListing() {
    const kategori = document.getElementById('ilanKategori').value;
    const isArsa = (kategori === 'imarli' || kategori === 'tarla' || kategori === 'zeytinlik');

    const yeniIlan = {
        id: Math.floor(100000 + Math.random() * 900000), 
        type: `${currentTransactionType}-${kategori}`,
        title: document.getElementById('ilanBaslik').value || "İsimsiz İlan",
        desc: document.getElementById('ilanAciklama').value || "Açıklama bulunmuyor.",
        price: parseInt(document.getElementById('ilanFiyat').value) || 0, 
        city: document.getElementById('ilanIl').value, 
        district: document.getElementById('ilanIlce').value,
        neighborhood: document.getElementById('ilanMahalle').value || "Merkez",
        date: new Date().toLocaleDateString('tr-TR'),
        seller: "Alper Kılınç (Siz)",
        status: "Bekliyor",
        premium: false,
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"] 
    };

    if(isArsa) {
        yeniIlan.m2 = document.getElementById('ilanArsaM2').value;
        yeniIlan.rooms = "Arsa";
        yeniIlan.zoning = document.getElementById('ilanImar').value;
        yeniIlan.ada = document.getElementById('ilanAda').value;
        yeniIlan.parsel = document.getElementById('ilanParsel').value;
        yeniIlan.deedStatus = document.getElementById('ilanTapu').value;
    } else {
        yeniIlan.m2Brut = document.getElementById('ilanM2Brut').value;
        yeniIlan.m2Net = document.getElementById('ilanM2Net').value;
        yeniIlan.m2 = yeniIlan.m2Brut; 
        yeniIlan.rooms = document.getElementById('ilanOda').value;
        yeniIlan.age = document.getElementById('ilanYas').value;
        yeniIlan.floor = document.getElementById('ilanKat').value;
        yeniIlan.heating = document.getElementById('ilanIsitma').value;
        yeniIlan.baths = document.getElementById('ilanBanyo').value;
        yeniIlan.facade = document.getElementById('ilanCephe').value;
        yeniIlan.furnished = document.getElementById('ilanEsyali').value;
    }

    let bekleyenIlanlar = JSON.parse(localStorage.getItem('adminPendingListings')) || [];
    bekleyenIlanlar.push(yeniIlan);
    localStorage.setItem('adminPendingListings', JSON.stringify(bekleyenIlanlar));

    alert("İlanınız onaya gönderildi. Yönetici paneline yönlendiriliyorsunuz.");
    window.location.href = "admin-panel.html"; 
}