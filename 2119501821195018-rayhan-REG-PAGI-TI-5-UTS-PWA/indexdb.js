var db;
var request = indexedDB.open('komentarDB', 1);

request.onerror = function(event) {
    console.log("Error saat membuka database: " + event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("komentar", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("nama", "nama", { unique: true });
    objectStore.createIndex("komentar", "komentar", { unique: true });

};

request.onsuccess = function(event) {
    db = event.target.result;
    // showComments();
};

// Menambahkan komentar ke dalam IndexedDB
document.getElementById('komentar-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var nama = document.getElementById('nama').value;
    var komentar = document.getElementById('komentar').value;

    var transaction = db.transaction(['komentar'], 'readwrite');
    var objectStore = transaction.objectStore('komentar');
    var comment = { nama: nama, komentar: komentar };
    objectStore.add(comment);

    document.getElementById('nama').value = '';
    document.getElementById('komentar').value = '';

    transaction.oncomplete = function() {
        alert("Komentar telah disimpan.");
        document.getElementById("komentarForm").reset();
        tampilkanKomentar();
    };

    transaction.onerror = function(event) {
        console.error("Kesalahan saat menyimpan komentar: " + event.target.error);
              };
    // showComments();
});