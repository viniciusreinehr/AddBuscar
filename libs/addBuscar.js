/**
 * versao: 1.0.1
 * API Jquery addBuscar - para tabelas
 * em 19/09/2014
 * por Vinicius Reinehr
 * Forma de uso:
 * - Carregar o arquivo js apos o carregamento do jquery;
 * - Adicione a classe addBuscar na tabela que deseja adicionar a busca
 * - Pronto!
 * Observacoes:
 * - A tabela deve estar nos padroes corretos;
 * - Deve conter pelo menos as tags thead e tbody;
 * - No head da tabela, as colunas devem ser th;
 * - No body, as colunas sao td;
 * Para alteracoes:
 * - Classe da th de busca: thBuscarItens
 * - o Input esta dentro desta linha
 * - o Texto Localizar esta dentro de uma label
*/
var addBuscar = {
	load:function(tabela){
		var colunas = $(tabela).find("thead").find("tr").find("th").length;
		var linhas = $(tabela).find("tbody").find("tr");
		var thead = $(tabela).find("thead");
		$("<tr><th class='thBuscarItens' colspan='"+colunas+"'><label>Localizar: <input type='text' size='50' id='inputBuscar' /></label></th></tr>").prependTo(thead);
		$("#inputBuscar").focus();
		$("#inputBuscar").keyup(function(){
			var texto = $(this).val();
			if(texto.length<2){
				$("table tbody tr").css("display","table-row");
				return false;
			}
			$(linhas).each(function(){
				var tdTr = $(this).find("td");
				var htmlTD = "";
				$(tdTr).each(function(){
					var input = $(this).html().search("<input");
					if(input<0){
						htmlTD += addBuscar.toSearch($(this).html());
					}else{
						htmlTD += "";
					}
				});
				var txtSearch = addBuscar.toSearch(texto);
				if(htmlTD.search(txtSearch)>=0){
					$(this).css("display","table-row");
				}else{
					$(this).css("display","none");
				}
			});
		});
	},
	
	toSearch:function(str){
		
		str = addBuscar.utf8_encode(str);
		str = str.replace(/À/gi,"A");
		str = str.replace(/Á/gi,"A");
		str = str.replace(/Â/gi,"A");
		str = str.replace(/Ã/gi,"A");
		str = str.replace(/Ä/gi,"A");
		str = str.replace(/Å/gi,"A");
		str = str.replace(/à/gi,"a");
		str = str.replace(/á/gi,"a");
		str = str.replace(/â/gi,"a");
		str = str.replace(/ã/gi,"a");
		str = str.replace(/ä/gi,"a");
		str = str.replace(/å/gi,"a");
		str = str.replace(/È/gi,"E");
		str = str.replace(/É/gi,"E");
		str = str.replace(/Ê/gi,"E");
		str = str.replace(/Ë/gi,"E");
		str = str.replace(/è/gi,"e");
		str = str.replace(/é/gi,"e");
		str = str.replace(/ê/gi,"e");
		str = str.replace(/ë/gi,"e");
		str = str.replace(/Í/gi,"I");
		str = str.replace(/Ì/gi,"I");
		str = str.replace(/Î/gi,"I");
		str = str.replace(/Ï/gi,"I");
		str = str.replace(/í/gi,"i");
		str = str.replace(/ì/gi,"i");
		str = str.replace(/î/gi,"i");
		str = str.replace(/ï/gi,"i");
		str = str.replace(/Ò/gi,"O");
		str = str.replace(/Ó/gi,"O");
		str = str.replace(/Ô/gi,"O");
		str = str.replace(/Õ/gi,"O");
		str = str.replace(/Ö/gi,"O");
		str = str.replace(/ò/gi,"o");
		str = str.replace(/ó/gi,"o");
		str = str.replace(/ô/gi,"o");
		str = str.replace(/õ/gi,"o");
		str = str.replace(/ö/gi,"o");
		str = str.replace(/Ù/gi,"U");
		str = str.replace(/Ú/gi,"U");
		str = str.replace(/Û/gi,"U");
		str = str.replace(/Ü/gi,"U");
		str = str.replace(/ù/gi,"u");
		str = str.replace(/ú/gi,"u");
		str = str.replace(/û/gi,"u");
		str = str.replace(/ü/gi,"u");
		str = str.replace(/Ç/gi,"C");
		str = str.replace(/ç/gi,"c");
		str = str.replace(/tr/gi,"");
		str = str.replace(/td/gi,"");
		str = str.replace(/>/gi,"");
		str = str.replace(/</gi,"");
		str = str.replace(/"/gi,"");
		str = str.replace(/=/gi,"");
		str = str.toLowerCase();
		
		return str; 
		
	},
	
	utf8_encode:function(argString){
		
		if (argString === null || typeof argString === 'undefined')
			return '';
		
		var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		var utftext = '', start, end, stringl = 0;
		
		start = end = 0;
		stringl = string.length;
		for (var n = 0; n < stringl; n++) {
			var c1 = string.charCodeAt(n);
			var enc = null;

			if (c1 < 128) {
				end++;
			} else if (c1 > 127 && c1 < 2048) {
				enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
			} else if ((c1 & 0xF800) != 0xD800) {
				enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128	);
			} else { // surrogate pairs
				if ((c1 & 0xFC00) != 0xD800) {
					throw new RangeError('Unmatched trail surrogate at ' + n);
				}
				var c2 = string.charCodeAt(++n);
				if ((c2 & 0xFC00) != 0xDC00) {
					throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
				}
				c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
				enc = String.fromCharCode((c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
			}
			if (enc !== null) {
				if (end > start) {
					utftext += string.slice(start, end);
				}
				utftext += enc;
				start = end = n + 1;
			}
		}

		if (end > start) {
			utftext += string.slice(start, stringl);
		}

		return utftext;
	}
};