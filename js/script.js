let menu = [
	{ id: 1, nama: 'Bacon Burger', kategori: 'food', harga: 27272, foto: 'BaconKingJr.png'},
	{ id: 2, nama: 'Burger Keju', kategori: 'food', harga: 36363, foto: 'DoubleCheeseburger.png'},
	{ id: 3, nama: 'Krabby Patty', kategori: 'food', harga: 45454, foto: 'MorningStarVeggieBurger.png'},
	{ id: 4, nama: 'White Water', kategori: 'drink', harga: 3636, foto: 'NestlePureLifeWater.png'},
	{ id: 5, nama: 'Cola', kategori: 'drink', harga: 5454, foto: 'CocaCola.png'},
	{ id: 6, nama: 'Sprite', kategori: 'drink', harga: 5454, foto: 'Sprite.png'},
	{ id: 7, nama: 'Pancakes', kategori: 'snack', harga: 9090, foto: 'PancakesandSausages.png'},
	{ id: 8, nama: 'Chicken Nugget', kategori: 'snack', harga: 9090, foto: 'ChickenNuggets.png'}
]
// let cart = [
// 	{ nama: 'Chicken Nugget', kategori: 'snack', harga: 9090, foto: 'ChickenNuggets.png', jumlah: 4}
// ]

function loadData(){
	setPage('home')
	initialLoad()
}

function initialLoad(){
	if (!localStorage.menu){
		localStorage.setItem('menu', JSON.stringify(menu))
	}
	
}
function loadMenu(){
	var data_menu = JSON.parse(localStorage.getItem('menu'))
	var data_food = ''
	var data_drink = ''
	var data_snack = ''
	for (i in data_menu){
		var menu_item = `<div class="col-6 my-2" onClick="addToCart(`+data_menu[i].id+`)">
								<div class="menu card">
									<img class="card-img-top" src="img/menu/`+data_menu[i].foto+`" alt="Card image cap">
									<div class="card-body">
										<h5 class="menu-name">`+data_menu[i].nama+`</h5>
										<span class="menu-price">Rp `+formatRupiah(data_menu[i].harga)+`</span>
									</div>
								</div>
							</div>`
		if(data_menu[i].kategori == 'food'){
			data_food += menu_item
		} else if(data_menu[i].kategori == 'drink'){
			data_drink += menu_item
		} else if(data_menu[i].kategori == 'snack'){
			data_snack += menu_item
		}
	}
	$("#food-menu").html(data_food)
	$("#drink-menu").html(data_drink)
	$("#snack-menu").html(data_snack)
}

function loadCart(){
	// cart page data
	var cart = []
	var data_cart = ''
	var total_cart = 0
	if (localStorage.cart){
		cart = JSON.parse(localStorage.getItem('cart'))
		$("#cart-info").show()
		for (i in cart){
			var nominal = cart[i].jumlah * cart[i].harga
			data_cart += `<div class="cart-item row my-1">
							<div class="col-6 pr-0">
								<span class="menu-name">`+cart[i].nama+`</span>
							</div>
							<div class="col-3 px-0">
								<a href="javascript:void(0)" class="btn btn-sm btn-warning btn-cart-action" title="Kurangi"><i class="fa fa-minus"></i></a>
								<span class="px-1">`+cart[i].jumlah+`</span>
								<a href="javascript:void(0)" class="btn btn-sm btn-success btn-cart-action" title="Tambah"><i class="fa fa-plus"></i></a>
								<a href="javascript:void(0)" class="btn btn-sm btn-danger btn-cart-action" title="Hapus" onClick="deleteCart(`+cart[i].id+`)"><i class="fa fa-trash"></i></a>
							</div>
							<div class="col-3 pl-0 text-right">
								`+formatRupiah(nominal)+`
							</div>
						</div>`
			total_cart = total_cart + nominal

			$("#cart-content").html(data_cart)
			$("#total-cart").html(formatRupiah(total_cart))

			var ppn = total_cart * 10  / 100
			ppn = parseInt(ppn)
			$("#ppn").html(formatRupiah(ppn))

			var total_bayar = total_cart + ppn
			$("#total-bayar").html(formatRupiah(total_bayar))
		}
	} else {
		$("#cart-info").hide()
		data_cart += `<div class="alert alert-warning">Keranjang anda masih kosong.</div>`
		$("#cart-content").html(data_cart)
	}
	

	// cart icon in home
	if (!localStorage.cart){
		$("#cart_num").hide()
	} else {
		$("#cart_num").show()
		$("#cart_num").html(cart.length)
	}
	
}

function addToCart(id_menu){
	// cek cart
	var cart = ''
	if (localStorage.cart){
		cart = JSON.parse(localStorage.getItem('cart'))
		for (i in cart){
			if(cart[i].id == id_menu){
				alert('Menu sudah ditambahkan')
				return false
			}
		}
	} else {
		cart = []
	}
	
	// penambahan cart
	var data_menu = JSON.parse(localStorage.getItem('menu'))
	var cart_item = ''
	for (i in data_menu){
		if(data_menu[i].id == id_menu){
			cart_item = {
				id: data_menu[i].id,
				nama: data_menu[i].nama,
				kategori: data_menu[i].kategori,
				harga: data_menu[i].harga,
				foto: data_menu[i].foto,
				jumlah: 1
			}
		}
	}
	cart.push(cart_item)
	localStorage.setItem('cart', JSON.stringify(cart))
	setPage('cart')
}

function deleteCart(id_menu){
	var cart = JSON.parse(localStorage.getItem('cart'))
	var index = 0
	for (i in cart){
		if(cart[i].id == id_menu){
			console.log(cart[i])
			cart.splice(index, 1)
		}
		index++
	}
	localStorage.setItem('cart', JSON.stringify(cart))
	if(cart.length == 0){
		localStorage.removeItem('cart')
	}
	loadCart()
}

function addNumCart(id_menu){
	var cart = JSON.parse(localStorage.getItem('cart'))
	var cart_item = ''
	var index = 0
	for (i in cart){
		if(cart[i].id == id_menu){
			cart.splice(index, 1) // dihapus, habis itu push lagi
		}
		index++
	}
	localStorage.setItem('cart', JSON.stringify(cart))
	if(cart.length == 0){
		localStorage.removeItem('cart')
	}
	loadCart()
}
function setPage(menu) {
    if (menu == "home") {
    	loadCart()
        $('#home').show()
        $('#menu').hide()
        $('#order').hide()
        $('#account').hide()
        $('#cart').hide()

        $('#nav').show()
        $('#order-btn').hide()
    } else if (menu == "menu") {
    	loadMenu()
        $('#home').hide()
        $('#menu').show()
        $('#order').hide()
        $('#account').hide()
        $('#cart').hide()

        $('#nav').show()
        $('#order-btn').hide()
    } else if (menu == "order") {
        $('#home').hide()
        $('#menu').hide()
        $('#order').show()
        $('#account').hide()
        $('#cart').hide()

        $('#nav').show()
        $('#order-btn').hide()
    } else if (menu == "account") {
        $('#home').hide()
        $('#menu').hide()
        $('#order').hide()
        $('#account').show()
        $('#cart').hide()

        $('#nav').show()
        $('#order-btn').hide()
    } else if (menu == "cart") {
    	loadCart()
        $('#home').hide()
        $('#menu').hide()
        $('#order').hide()
        $('#account').hide()
        $('#cart').show()

        $('#nav').hide()
        $('#order-btn').show()
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