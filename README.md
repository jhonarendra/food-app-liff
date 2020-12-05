# Food Order App

Project ini dibuat untuk mempelajari Line Front End Framework (LIFF)

## Tools
- Bootstrap 4 supaya styling lebih cepat
- JQuery untuk memudahkan DOM
- LocalStorage (Web browser)

> Disini saya mengikuti materi yaitu menggunakan JQuery untuk manipulasi tampilan web dan LocalStorage pada web browser sebagai media penyimpanan data

## LIFF
Line Front End Framework atau LIFF ini bisa dijalankan
pada aplikasi LINE dengan mengklik link ke app tersebut.
Jadi mungkin seperti web view dalam aplikasi mobile. Tetapi
terdapat berbagai fitur LINE bisa digunakan di aplikasi web tersebut.
Misalnya get profil dan login line. Sehingga kita bisa merasakan
jadi developer LINE App karena aplikasi kita ada di LINE 😁.

## Create LIFF project
Untuk memulai membuat project LIFF, kita perlu mendaftar ke website line developer
1. Login ke [developers.line.biz](https://developers.line.biz/)
2. Buat dan atur provider
3. Buat LIFF app pada provider tersebut

## Code
- Mungkin sedikit penjelasan dari kode, untuk bisa mendaftarkan aplikasi, kita perlu memasang sdk liff berupa javascript.
```
<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
```
- Kemudian untuk menggunakan api dari liff, dokumentasinya ada di link [LINE Front-end Framework | LINE Developers](https://developers.line.biz/en/docs/liff/overview)
- Untuk mengubah page, karena menggunakan jquery saja, saya pakai show hide section. Lihat di `script.js` bagian
```
function setPage(menu) {
    if (menu == "home") {
    	loadCart()
        $('#home').show()
        $('#menu').hide()
        $('#order').hide()
        $('#account').hide()
 ...
    } else if (menu == "order-detail") {
    	loadCart()
        $('#home').hide()
        $('#menu').hide()
        $('#order').hide()
        $('#account').hide()
        $('#cart').hide()
        $('#order-detail').show()

        $('#nav').hide()
        $('#order-btn').hide()
    }
}
 ```
- Lalu untuk penyimpanan data, pakai LocalStorage dari browser. Contoh sintaks seperti ini
```
localStorage.setItem('cart', JSON.stringify(cart))
cart = JSON.parse(localStorage.getItem('cart'))
```
## Testing App
- Testing app melalui web browser bisa mengakses di link https://liff.line.me/1655314108-3YBeQLy4
- Melalui LINE bisa mengakses LINE OA saya dengan ID `@zrc5584x` (dengan @). Nanti message pembuka akan muncul link aplikasi
- Atau coba di kolom chat lain dengan mengirim link `line://app/1655314108-3YBeQLy4`
