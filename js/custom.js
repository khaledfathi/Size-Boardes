/********************************/
/*All Var needed*/
	//input x and y
var input_x = document.getElementById("in_x"),
	input_y = document.getElementById("in_y"),
	//action button for draw the squre
	extract = document.getElementById("ext"),
	new_bordes= document.getElementById("new_bordes"),
	//select element ford set control
	select_board_number = document.getElementById("sel"),
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
var id_num=0;
//create uniq element id (return array that has uniq id name [0] will use in new boardes, and id number [1] will use in select option value)
function create_id(){
	id_num+=1
	var id="item"+id_num;
	return [id_num ,id ];
}
/********************************/
//function for rotate bord : parameter (element id that will be rotate)
function rotate_fun(elementId){
	var el=document.getElementById(elementId),
		width = el.style.width,
		height=el.style.height,
		new_width = height,
		new_height = width;
	el.style.width=new_width;
	el.style.height=new_height;
}

//rotate button action for make target bord rotate
rotate.onclick = function(){
	var select_target = select_board_number.value,
		borde_id = "item"+select_target;
	rotate_fun(borde_id);
};
/********************************/
//function create element: parameter(elemnt tag , text nod , ReplaceId:"id" where to append it ,newElementId:set id for new element,value:set value for new element)
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
	var new_id = create_id(),
		borde_style="border:1px solid red;position:absolute;right:0;top:0;width:"+input_x.value+";height:"+input_y.value+";";//style for new borde , width and height depend on the input_x and input _y
	create_element("div",input_x.value + " X " + input_y.value +"("+new_id[1]+")","new_bordes",new_id[1]);//create div borde
	var new_div = document.getElementById(new_id[1]);
		new_div.style=borde_style;
		new_div.setAttribute("class","all_items");
	create_element("option",new_id[1],"sel","",new_id[0]);//create select option for div
	//select the laste div created in select option
	var last_option = select_board_number.length -1;
	select_board_number[last_option].setAttribute("selected","");
	//fix position for new div 
	fix_position();
};
/********************************/

//wite fine value on lable 
fine.onmousemove = function(){
	var range_value = fine.value,
		fine_label = document.getElementById("fine_label");
	fine_label.innerHTML=range_value;
};
var count_r_l=0, //stander value for right and left position
	count_u_d=0; //stander value for up and down position

//fix position when change the borde selected to another one (replace the position right and top to count_r_l and count_u_d)
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
