// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    
    // --- ÖZEL SAĞ TIK MENÜSÜ (Custom Context Menu) ---
    const contextMenu = document.getElementById("customContextMenu");
    const closeMenuBtn = document.querySelector(".close-menu");

    // Tüm sayfada sağ tıklamayı dinle
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault(); // Tarayıcının varsayılan menüsünü iptal et
        
        // Farenin konumunu al
        let x = e.offsetX;
        let y = e.offsetY;
        
        // Menünün ekranın dışına taşmasını engelle
        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;
        let cmWidth = contextMenu.offsetWidth;
        let cmHeight = contextMenu.offsetHeight;

        x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
        y = y > winHeight - cmHeight ? winHeight - cmHeight : y;

        // Menüyü konumlandır ve göster
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        contextMenu.style.display = "block";
    });

    // Menü dışında bir yere veya kapat butonuna tıklanınca menüyü gizle
    document.addEventListener("click", () => contextMenu.style.display = "none");
    if(closeMenuBtn) {
        closeMenuBtn.addEventListener("click", () => contextMenu.style.display = "none");
    }
});