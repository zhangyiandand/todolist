window.addEventListener('load',function () {
    let tab=document.querySelectorAll('.tab>li');
    let prev=0;
    let content=document.querySelector('.content');
    let type='all';
    let flag={all:'all',done:true,doing:false}
    let todolist=[
        {
            id:1,content:'写作业',ctime:'2019/6/6',status:false
        },
        {
            id:2,content:'交作业',ctime:'2019/6/6',status:true
        },
        {
            id:3,content:'写好多作业',ctime:'2019/6/6',status:true
        },
        {
            id:4,content:'交好多作业',ctime:'2019/6/6',status:true
        }
    ];

    localStorage.getItem('todolist')? JSON.parse(localStorage.getItem('todolist')):todolist;



    tab.forEach(function (ele,index) {
        ele.onclick=function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot');
            prev=index;
            type=this.getAttribute('type');

            render(filterData(type));
        }
    })
    tab[0].onclick();

    content.onclick=function (e) {
        let arr=[];
        let target=e.target;
        let id=target.parentNode.id;
        if (target.nodeName === 'INPUT') {
            let ele = todolist.filter(ele=>ele.id == id)[0];
            console.log(ele);
            ele.status =target.checked;
        } else if (target.nodeName==='DEL'){
            let index=todolist.findIndex(ele=>ele.id===id);

            todolist.splice(index,1);

            render(filterData(type));
        }
    }
//    增加列表
    let forms=document.forms[0];
    let textBtn=forms.elements['content'];
    let submitBtn=forms.elements[1];

    submitBtn.onclick=function (e) {
        e.preventDefault();
        let obj=createObj();
        todolist.push(obj);
        forms.reset();
        render(filterData(type));
        saveData();
    };
//    本地存储
    function saveData() {
        localStorage.setItem("todolist",JSON.stringify(todolist))
    }

    function createObj() {
        let id=todolist[todolist.length-1].id+1;
        let content=textBtn.value;
        let ctime=new Date().toLocaleDateString();
        let status=false;
        return{id,content,ctime,status}
    }
    function filterData(type) {
        let arr=[];
        switch (type) {
            case 'all':
                arr=todolist;
                break;
            case 'done':
                arr=todolist.filter(ele=>ele.status)
                break;
            case 'doing':
                arr=todolist.filter(ele=>!ele.status)
                break;

        }
        return arr;
    }
//    渲染列表
    function render(arr) {
        let html='';
        arr.forEach(ele=>{
            if (ele.status) {
                html+=`
                 <li id="${ele.id}">
                   <input type="checkbox" checked> <p>${ele.content}</p> <del>X</del><time>${ele.ctime}</time>
                 </li>
                `;
            }else {
                html+=`
                <li id="${ele.id}">
                  <input type="checkbox" checked> <p>${ele.content}</p> <del>X</del><time>${ele.ctime}</time>
                </li>
                `;
            }

        })
        content.innerHTML=html;
    }
})