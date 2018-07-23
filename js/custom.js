/********************************/
/*All Var needed*/
	//input x and y
var input_x = document.getElementById("in_x"),
	input_y = document.getElementById("in_y"),
	//change size button
	change_size_button = document.getElementById("change_size_button"),
	//main bord size div input field
	change_size_div = document.getElementById("change_size_div"),
	//action button for draw the squre
	extract = document.getElementById("ext"),
	new_bordes= document.getElementById("new_bordes"),
	//select element ford set control
	select_board_number = document.getElementById("sel"),
	//delete spcific bord (button)and its name in select list
	delete_item = document.getElementById("delete_current"),
	//direction buttons
	r = document.getElementById("r"),
	l = document.getElementById("l"),
	u = document.getElementById("u"),
	d = document.getElementById("d"),
	//support button( reset and rotate and fine buttons)
	fine = document.getElementById("fine"),
	rotate = document.getElementById("rotate"),
	reset = document.getElementById("reset");
/********************************/

//stander value for main bord size(width and height)
var new_x = document.getElementById("main_x").value=140,
	new_y = document.getElementById("main_y").value=200;
//convert cm to screen px 
function convert_cm_to_px (){//cm_x is width size in cm , and cm_y is same but for height (return array [x,y] in px)
	var new_x = document.getElementById("main_x").value,
		new_y = document.getElementById("main_y").value;
	var	x = 500/new_x,
		y = 600/new_y;
	return [x,y]
}
/********************************/

//remove hide when press on change size button(onclick event)
change_size_button.onclick = function(){
	change_size_div.removeAttribute("hidden");
};
//save new board size and close the new size input filed
var save_new_size = document.getElementById("save_new_size");
	//stander values is width 140 cm and height 200cm
save_new_size.onclick = function(){
	change_size_div.setAttribute("hidden","");
	var new_x = document.getElementById("main_x").value,
		new_y = document.getElementById("main_y").value,
		borde_width_label = document.getElementById("borde_width_label"),
		borde_height_label = document.getElementById("borde_height_label");
	if (!new_x || !new_y){
		alert("Missing Data the size will set to (140 cm X 200 cm)");
		borde_width_label.innerHTML="140 Cm";
		borde_height_label.innerHTML="200 Cm";
	}else if(new_x && new_y){
		alert("The New Board size is set to ( "+new_x+" X "+new_y+" )");		
		borde_width_label.innerHTML=new_x+" Cm";
		borde_height_label.innerHTML=new_y+" Cm";
	}	
};
/********************************/

var id_num=0;
//create uniq element id (return array that has uniq id name [0] will use in new boardes, and id number [1] will use in select option value)
function create_id(){
	id_num+=1
	var id="item"+id_num;
	return [id_num ,id ];
}
/********************************/

//function for rotate bord : parameter (width , height)
function rotate_fun(elementId){
	var el=document.getElementById(elementId),
		width = el.style.width,
		height=el.style.height,
		new_width = height,
		new_height = width;
	el.style.width=new_width;
	el.style.height=new_height;
}
/********************************/

//delete current borde and its name in select list 
delete_item.onclick = function (){
	var selected = select_board_number.value,
		current_select_option =document.getElementById("sel"+selected),
		current_select_bord = document.getElementById("item"+selected);
	if (selected > 0){
		current_select_option.parentElement.removeChild(current_select_option);
		current_select_bord.parentElement.removeChild(current_select_bord);	
	}
};
//rotate button action for make target bord rotate
rotate.onclick = function(){
	var select_target = select_board_number.value,
		borde_id = "item"+select_target;
	rotate_fun(borde_id);
};
/********************************/
//function create element: parameter(elemnt tag , text nod , "id" where to append it )
function create_element(tag , textNod="" , ReplaceId , newElementId , value=""){
	var el=document.createElement(tag),
		txt = document.createTextNode(textNod);
	el.appendChild(txt);
	el.setAttribute("id",newElementId);
	el.setAttribute("value",value)
	var place = document.getElementById(ReplaceId);
	place.appendChild(el);
}
/********************************/
//add new borde and add select option with value point the spcific bord
extract.onclick = function (){
	var cm_to_px = convert_cm_to_px(),
		new_id = create_id(),
		borde_style="border:1px solid #0F0;color:#0F0;position:absolute;right:0;top:0;width:"+cm_to_px[0]*input_x.value+"px"+";height:"+cm_to_px[1]*input_y.value+"px"+";";//style for new borde , width and height depend on the input_x and input _y
	create_element("div",input_x.value + " X " + input_y.value +" ( "+new_id[1]+" )","new_bordes",new_id[1]);//create div borde
	var new_div = document.getElementById(new_id[1]);
		new_div.style=borde_style;
		new_div.setAttribute("class","all_items");
	create_element("option",new_id[1],"sel","sel"+new_id[0],new_id[0]);//create select option for div
	//select the laste div created in select option
	var last_option = select_board_number.length -1;
	select_board_number[last_option].setAttribute("selected","");
	//fix position for new div 
	fix_position();
};
/********************************/

//write fine value on lable 
fine.onmousemove = function(){
	var range_value = fine.value,
		fine_label = document.getElementById("fine_label");
	fine_label.innerHTML=range_value;
};
/********************************/

//fix position when change the borde selected to another one (replace the position right and top to count_r_l and count_u_d)
var count_r_l=0, //stander value for right and left position
	count_u_d=0; //stander value for up and down position
function fix_position (){
	var current = select_board_number.value,
		borde = document.getElementById("item"+current),
		right_value = borde.style.right,
		top_value = borde.style.top,
		right = right_value.replace("px",""),
		top = top_value.replace("px","");
		count_r_l = Number(right);
		count_u_d = Number(top);
};
select_board_number.onchange =function(){
	fix_position();
};
/********************************/

//direction buttons functions 
r.onclick = function(){//move div to right
	var borde_num = select_board_number.value,
		change_this = document.getElementById("item"+borde_num);
		count_r_l-=Number(fine.value);
		change_this.style.right=count_r_l;
};
l.onclick = function(){//move div to left
	var borde_num = select_board_number.value,
		change_this = document.getElementById("item"+borde_num);
		count_r_l+=Number(fine.value);
		change_this.style.right=count_r_l;
};
u.onclick = function(){//move div to up
	var borde_num = select_board_number.value,
		change_this = document.getElementById("item"+borde_num);
		count_u_d-=Number(fine.value);
		change_this.style.top=count_u_d;
};
d.onclick = function (){//move div to down
	var borde_num = select_board_number.value,
		change_this = document.getElementById("item"+borde_num);
		count_u_d+=Number(fine.value);
		change_this.style.top=count_u_d;
};
/********************************/

//Reset function - remove all value in input x , input y and remove every option in "select bord" also remove all bord/div the program created before , and reset var id_num to 0 
reset.onclick = function (){
	"use strict";
	select_board_number.innerHTML="";
	input_x.value="";
	input_y.value="";
	new_bordes.innerHTML="";
	id_num=0;
	count_r_l=0;
	count_u_d=0;	
};
