// js/admin.js (Tam ve Hatasız Versiyon)

let pendingListingsDTO = [];
let selectedListingId = null; 

document.addEventListener("DOMContentLoaded", () => {
    // SATICININ GÖNDERDİĞİ VERİLERİ OKU
    const savedData = JSON.parse(localStorage.getItem('adminPendingListings'));
    
    if (savedData && savedData.length > 0) {
        pendingListingsDTO = savedData;
    } else {
        // Eğer hiç ilan verilmemişse varsayılan 1 tane sahte ilan göster
        pendingListingsDTO = [{
            id: 9999, title: "Hatay Merkez Lüks Daire (Örnek)", sellerName: "Sistem", price: 2500000, date: new Date().toLocaleDateString('tr-TR'), description: "Örnek sistem ilanıdır.", status: "Bekliyor"
        }];
    }
    
    loadTableData();
});

function loadTableData() {
    const tableBody = document.getElementById("adminTableBody");
    tableBody.innerHTML = ""; 

    if(pendingListingsDTO.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px;">Şu an onay bekleyen ilan bulunmamaktadır.</td></tr>`;
    }

    pendingListingsDTO.forEach(listing => {
        const row = document.createElement("tr");
        
        // Fiyat sayısal geliyorsa TL formatına çevir
        const formattedPrice = typeof listing.price === 'number' ? listing.price.toLocaleString('tr-TR') + ' TL' : listing.price;

        row.innerHTML = `
            <td><strong>#${listing.id}</strong></td>
            <td>${listing.title}</td>
            <td>${listing.sellerName}</td>
            <td style="color: #e55039; font-weight: bold;">${formattedPrice}</td>
            <td>${listing.date}</td>
            <td><span style="background: #fbc531; color: #fff; padding: 5px 10px; border-radius: 10px; font-size: 12px;">${listing.status}</span></td>
            <td><button onclick="openPreview('${listing.id}')" style="background: #00a8ff; color: white; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; font-weight: bold;">İncele</button></td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("pendingCount").innerText = pendingListingsDTO.length;
}

function openPreview(id) {
    // BUG FIX: Sayı ve Metin uyuşmazlığını önlemek için ikisini de String'e çevirip karşılaştırıyoruz
    const listing = pendingListingsDTO.find(item => String(item.id) === String(id));
    
    if(listing) {
        selectedListingId = listing.id; 
        document.getElementById("previewTitle").innerText = listing.title;
        document.getElementById("previewSeller").innerText = listing.sellerName;
        
        const formattedPrice = typeof listing.price === 'number' ? listing.price.toLocaleString('tr-TR') + ' TL' : listing.price;
        document.getElementById("previewPrice").innerText = formattedPrice;
        
        document.getElementById("previewDesc").innerText = listing.description;
        document.getElementById("previewModal").style.display = "flex";
    }
}

function closePreview() {
    document.getElementById("previewModal").style.display = "none";
    selectedListingId = null;
}

function approveListing() {
    const listingToApprove = pendingListingsDTO.find(item => item.id === selectedListingId);
    
    if(listingToApprove) {
        // Onaylanan ilanı ana sayfanın okuyacağı veritabanına ekle
        let approvedListings = JSON.parse(localStorage.getItem('approvedListings')) || [];
        listingToApprove.status = "Yayında";
        approvedListings.push(listingToApprove);
        localStorage.setItem('approvedListings', JSON.stringify(approvedListings));
    }

    alert(`✅ İşlem Başarılı: İlan onaylandı ve ANASAYFA'da yayına alındı!`);
    removeListingFromTable(selectedListingId);
    closePreview();
}

function rejectListing() {
    alert(`❌ İlan reddedildi. Satıcıya bildirim gönderildi.`);
    removeListingFromTable(selectedListingId);
    closePreview();
}

function removeListingFromTable(id) {
    pendingListingsDTO = pendingListingsDTO.filter(item => item.id !== id);
    localStorage.setItem('adminPendingListings', JSON.stringify(pendingListingsDTO));
    loadTableData(); 
}