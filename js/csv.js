function init(){
	var file1 = new XMLHttpRequest();
	file1.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var lines = this.responseText.split('\n');
			var strOut = "<ul>";
			for (i = 0; i < lines.length; i++){
				var field = lines[i].split(',');
				strOut += "<li>ID: " + field[0] + ", Name: " + field[1];
				strOut += "</li>";
			}
			strOut += "</ul>";
			document.getElementById("output").innerHTML = strOut;
		}
	};
	file1.open("GET", "students.csv", true);
	file1.send();
}
window.onload = init;