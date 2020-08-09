let aqw_target = null;
let aqw_save_text = "";

let aqwClear = () => {
	$("#aqw-content").remove();
	$("#aqw-overlay").remove();
}

$(document).on("click", (event) => {
	let is_aqw = !!$('#aqw-content').length;
	if (!is_aqw) {
		if (event.target.tagName == "INPUT" || event.target.tagName == "TEXTAREA") {
			aqw_target = $(event.target);
		} else {
			aqw_target = null;
		}
	}
});

chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
	let is_iex = !!$('#aqw-content').length;
	let is_aqw_target = !!aqw_target;
	let aqw_textarea_val;

	if (is_iex) {
		aqwClear();
	} else {
		if (is_aqw_target) {
			aqw_textarea_val = aqw_target.val()
		} else {
			aqw_textarea_val = aqw_save_text;
		}

		// let aqw_content = $('<div>', {
		// 	id: 'aqw-content'
		// });
		// let aqw_modal = $('<div>', {
		// 	id: 'aqw-modal'
		// });
		// let aqw_title = $('<div>', {
		// 	id: 'aqw-title',
		// 	text: 'AQW'
		// }); 
		// let aqw_body = $('<div>', {
		// 	id: 'aqw-body'
		// });
		// let aqw_work_name = $('<div>', {
		// 	id: ''
		// });
		
		// let aqw_modal = "";
		// aqw_modal += "<div id='aqw-content'>";
			// aqw_modal += "<modal id='aqw-modal'>";
				// aqw_modal += "<div id='aqw-title'>Input EX</div>";
					// aqw_modal += "<div id='aqw-body'>";
						// aqw_modal += "<div id='aqw-text'>";
						// 	aqw_modal += "<textarea id='aqw-textarea'>" + aqw_textarea_val + "</textarea>";
						// 	if (is_aqw_target) {
						// 		aqw_modal += "<div id='aqw-command-label'>Shift+Enterで更新</div>";
						// 	}
						// aqw_modal += "</div>";
						// aqw_modal += "<div id='aqw-snippets'>";
						// 	aqw_modal += "<label id='aqw-snippets-label'>Snippets:</label>";
						// 	aqw_modal += "<button class='aqw-snippet' value='Hello, Snippet!!'>Hello, Snippet!!</button>";
						// 	aqw_modal += "<button class='aqw-snippet' value='ああああ'>Hello, Snippet!!</button>";
						// 	aqw_modal += "<button class='aqw-snippet' value='いいいい'>Hello, Snippet!!</button>";
						// 	aqw_modal += "<button class='aqw-snippet' value='うううう'>Hello, Snippet!!</button>";
						// 	aqw_modal += "<button class='aqw-snippet' value='ええええ'>Hello, Snippet!!</button>";
						// 	aqw_modal += "<button id='aqw-add-snippet'>＋</button>";
						// aqw_modal += "</div>";
					// aqw_modal += "</div>";
				// aqw_modal += "</div>";
			// aqw_modal += "</modal>";
		// aqw_modal += "</div>";
		aqw_modal += "<div id='aqw-overlay'></div>";
		
		console.log(aqw_modal);
		$("body").append(aqw_modal);
		
		// $("#aqw-content").css('max-height','1000px');

		// スニペット追加
		$(".aqw-snippet").on("click", function(e) {
			aqw_textarea.val(aqw_textarea.val() + $(this).val());
			aqw_textarea.focus();
		});
		
		// テキストを表示し、カーソルを末尾に
		let aqw_textarea = $("#aqw-textarea");
		aqw_textarea.focus();
		let aqw_tmp = aqw_textarea.val();
		aqw_textarea.val("");
		aqw_textarea.val(aqw_tmp);
		
		if (is_aqw_target) {
			//Shift+エンターで更新
			aqw_textarea.keydown(function(e){
				if(event.shiftKey) {
					if(e.keyCode === 13) {
						aqw_target.val(aqw_textarea.val());
						aqwClear();
						aqw_target.focus();
						return false;
					}
				}
			});
		}
		
		// 常にテキストエリアの縦幅調整
		variableTextArea(aqw_textarea);
		aqw_textarea.on('input', function(e) {
			variableTextArea($(this));
			aqw_save_text = $(this).val();
		});
	}

	if (request.greeting == "hello")
		sendResponse({farewell: "OK"});
	else
		//★ここ重要★ レスポンスがない場合でも、必ず空のオブジェクトを返す。
		sendResponse({}); // snub them.
	}
);

// target.css("background-color","#ff6300");

// if (target_tag_name == "INPUT" || target_tag_name == "TEXTAREA"){
//     chrome.runtime.sendMessage({method: "postTarget", target_info: JSON.stringify([{target: target, target_tag_name: target_tag_name, target_val:target_val}])}, function(response) {
//         if(response.responce){
//             console.log("target_set: ", response.responce);
//         }
//     });
// }


// chrome.runtime.sendMessage({method: "getTarget"},function(response) {
//     if(response.responce){
//         console.log("target_get: ", response.responce);
//     }
//     let target_tag_name = response.target_tag_name;
//     let target_val = response.target_val;
// });