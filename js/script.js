let menu = [
	{ nama: 'Bacon Burger', kategori: 'food', harga: 27272, foto: 'BaconKingJr.png'},
	{ nama: 'Burger Keju', kategori: 'food', harga: 36363, foto: 'DoubleCheeseburger.png'},
	{ nama: 'Krabby Patty', kategori: 'food', harga: 45454, foto: 'MorningStarVeggieBurger.png'},
	{ nama: 'White Water', kategori: 'drink', harga: 3636, foto: 'NestlePureLifeWater.png'},
	{ nama: 'Cola', kategori: 'drink', harga: 5454, foto: 'CocaCola.png'},
	{ nama: 'Sprite', kategori: 'drink', harga: 5454, foto: 'Sprite.png'},
	{ nama: 'Pancakes', kategori: 'snack', harga: 9090, foto: 'PancakesandSausages.png'},
	{ nama: 'Chicken Nugget', kategori: 'snack', harga: 9090, foto: 'ChickenNuggets.png'}
]

function loadData(){
	setPage('home')
}

function loadMenu(){
	var data_food = ''
	var data_drink = ''
	var data_snack = ''
	for (i in menu){
		var data_menu = `<div class="col-6 my-2" onClick="setPage('cart')">
								<div class="menu card">
									<img class="card-img-top" src="img/menu/`+menu[i].foto+`" alt="Card image cap">
									<div class="card-body">
										<h5 class="menu-name">`+menu[i].nama+`</h5>
										<span class="menu-price">Rp `+formatRupiah(menu[i].harga)+`</span>
									</div>
								</div>
							</div>`
		if(menu[i].kategori == 'food'){
			data_food += data_menu
		} else if(menu[i].kategori == 'drink'){
			data_drink += data_menu
		} else if(menu[i].kategori == 'snack'){
			data_snack += data_menu
		}
	}
	$("#food-menu").html(data_food)
	$("#drink-menu").html(data_drink)
	$("#snack-menu").html(data_snack)
}

function setPage(menu) {
    if (menu == "home") {
        $('#home').show()
        $('#menu').hide()
        $('#order').hide()
        $('#account').hide()
        $('#cart').hide()

        $('#nav').show()
    } else if (menu == "menu") {
    	loadMenu()
        $('#home').hide()
        $('#menu').show()
        $('#order').hide()
        $('#account').hide()
        $('#cart').hide()

        $('#nav').show()
    } else if (menu == "order") {
        $('#home').hide()
        $('#menu').hide()
        $('#order').show()
        $('#account').hide()
        $('#cart').hide()

        $('#nav').show()
    } else if (menu == "account") {
        $('#home').hide()
        $('#menu').hide()
        $('#order').hide()
        $('#account').show()
        $('#cart').hide()

        $('#nav').show()
    } else if (menu == "cart") {
        $('#home').hide()
        $('#menu').hide()
        $('#order').hide()
        $('#account').hide()
        $('#cart').show()

        $('#nav').hide()
    }
}

function formatRupiah(angka){
    var angka = angka.toString()

    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split('.'),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah
}