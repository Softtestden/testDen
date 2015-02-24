Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext', '../js/extjs');
Ext.require([
    '*'
]);

var sss = new Array()
var ii=0; 
var i=0;
var jj=0;

Ext.onReady(function(){

var button = Ext.create('Ext.button.Button', { 
        text: 'Показать',
        handler: function() {
                var login = childPanel1.getForm();
                login.submit({
                    url: '/users/user-manager/grid',
                    success: function (form, action) { 
                         Ext.define('User1', {
                             extend: 'Ext.data.Model',
                             fields: [
                                   {
                                    name: 'id',
                                    type: 'int'
                                   },{
                                    name: 'name',
                                    type: 'string'
                                   },{
                                    name: 'education',
                                    type: 'string'
                                    
                                   },{
                                    name: 'city',
                                    type: 'string'
                                   }]
                          });
                          
                        var fields = [ {name: 'id'},
                                       {name: 'name', type: 'string'},
                                       {name: 'education', type: 'string'},
                                       {name: 'city', type: 'string'}];  // тип данных
    
                        var store1 = Ext.create('Ext.data.ArrayStore', {
                                 model: 'User1',
                                 autoLoad: true,
                                 autoSync: true,
                                 data: action.result.users,
                                 listeners:{
                                        write:function(store, operation) { //
                                                      updat=operation.records[0].data;
                                                      Ext.Ajax.request({
                                                                url: '/users/user-manager/edit',
                                                                method: 'post',
                                                                params: {'id' : updat.id , 'education' : updat.education },              
                                                                success: function(){   
                                                                                var ii = 0; var sss1 = new Array()
                                                                                Ext.Ajax.request({ 
                                                                                            url: '/users/user-manager/menu',
                                                                                            method: 'post',
                                                                                            params: {'par' : 'EducTable' },
                                                                                            success: function(response, options){
                                                                                                var objAjax1 = Ext.decode(response.responseText)
                                                                                                for (jj=0; jj<objAjax1.length; jj++){
                                                                                                                sss1[ii] = {
                                                                                                                            xtype: 'checkbox',
                                                                                                                            boxLabel: objAjax1[jj].education,
                                                                                                                            name:'education'+objAjax1[jj].id_user ,
                                                                                                                            checked:'true',
                                                                                                                            inputValue: objAjax1[jj].id_user,
                                                                                                                            width:220
                                                                                                                            };ii++
                                                                                                }
                                                                                      
                                                                                                var box2=new Ext.form.CheckboxGroup({
                                                                                                                    fieldLabel: 'Образование',
                                                                                                                    id:'Education',
                                                                                                                    columns: 1,
                                                                                                                    margin: 5 ,
                                                                                                                    style:'margin-left:100px;',
                                                                                                                    items: sss1
                                                                                                                    });
                                                                                                Ext.get('Education').remove();
                                                                                                Ext.getCmp('bigPannel1').add(box2)                        

                                                                                            },
                                                                                             failure: function(response, options){    }
                                                                                    });
                                                                 }});                                                  
                                                     }
                                     }   
    
                            });

        var tab1=Ext.create('Ext.grid.Panel', {
                    plugins:[{ ptype:'rowediting', clicksToEdit: 1 }],
                    title: 'Пользователи',
                    id:'grid',
                    height: 200,
                    store: store1,
                    columns: [{ header: 'id', dataIndex: 'id'},
                              { header: 'Имя', dataIndex: 'name'},
                              { header: 'Образование', dataIndex: 'education',
                                editor: { allowBlank: false  }},
                              { header: 'Город', dataIndex: 'city', }],
                   });
        var element=document.getElementById('grid');
        if(!element){Ext.getCmp('bigPannel2').add(tab1) }
        else { Ext.get('grid').remove(); Ext.getCmp('bigPannel2').add(tab1)}

                            },
   failure: function () { }
    });
  }
});

////////////////////////////////////////////////////////////        
var childPanel1 = Ext.create('Ext.form.Panel', {
        id : 'bigPannel1',
        title: 'Выберите интересующие параметры',
        collapsible: true,
        layout: {type: 'hbox',align: 'stretch'}
        });
     
var childPanel2 = Ext.create('Ext.panel.Panel', {
        id : 'bigPannel2',
        }); 

Ext.create('Ext.container.Viewport', {
                      id : 'bigPannel',
                      layout: { type: 'vbox', align: 'stretch' },
                      items: [ childPanel1,childPanel2 ]
             }); 
             
var store = Ext.create('Ext.data.JsonStore', {     // определение хранилища для удаленного источника данных
                                fields: [ 'id','name'],   
                                proxy: {                    // описание proxy-объекта, кторый будет запрашивать сервер
                                       type: 'ajax',           // тип прокси = Ajax
                                       url: '/users/user-manager/index1',         
                                       reader: {
                                             type: 'json',       
                                             root: 'data.users'      // здесь свойство JSON объекта в котором передается сам массив данных
                                             }
                                }
});

Ext.Ajax.request({ 
                   url: '/users/user-manager/menu',
                   method: 'post',
                   params: {'par' : 'UserTable' },
                   success: function(response, options){
                                                 var objAjax = Ext.decode(response.responseText)
                                                 for (jj=0; jj<objAjax.length; jj++){
                                                                                    sss[ii] = {
                                                                                        xtype: 'checkbox',
                                                                                        boxLabel: objAjax[jj].name,
                                                                                        name:'users'+objAjax[jj].id ,
                                                                                        checked:'true',
                                                                                        inputValue: objAjax[jj].id,
                                                                                        width:220
                                                                                       };ii++
                                                                              
                                                                                       }
                                                  var box1=new Ext.form.CheckboxGroup({
                                                                                      fieldLabel: 'Имя',
                                                                                      id:'Name',
                                                                                      columns: 1,
                                                                                      margin: 5 ,
                                                                                      style:'margin-left:100px;',
                                                                                      items: sss
                                                                                   });
                                                                            // Ext.get('Education').remove();
                                                  Ext.getCmp('bigPannel1').add(box1)                        
                                                       },
                     failure: function(response, options){  }
    }); 
delete sss;
    
var ii = 0;
var sss2 = new Array()
Ext.Ajax.request({
                  url: '/users/user-manager/menu',
                  method: 'post',
                  params: {'par' : 'cityTable' },
                  success: function(response, options){
                    var objAjax1 = Ext.decode(response.responseText)
                    for (jj=0; jj<objAjax1.length; jj++){
                                                        sss2[ii] = {
                                                                    xtype: 'checkbox',
                                                                    boxLabel: objAjax1[jj].city,
                                                                    name:'city'+objAjax1[jj].id_user ,
                                                                    checked:'true',
                                                                    inputValue: objAjax1[jj].id_user,
                                                                    width:220
                                                                   };ii++
                                                         }
                                                         
                    var box2=new Ext.form.CheckboxGroup({
                                                         fieldLabel: 'Город',
                                                         id:'City',
                                                         columns: 1,
                                                         margin: 5 ,
                                                         style:'margin-left:100px;',
                                                         items: sss2
                                                         });
                     Ext.getCmp('bigPannel1').add(box2)                        
                  },
                  failure: function(response, options){    }
    });
 
var ii = 0;
var sss1 = new Array()
Ext.Ajax.request({
                  url: '/users/user-manager/menu',
                  method: 'post',
                  params: {'par' : 'EducTable' },
                  success: function(response, options){
                                                       var objAjax1 = Ext.decode(response.responseText)
                                                       for (jj=0; jj<objAjax1.length; jj++){
                                                                                          sss1[ii] = {
                                                                                                    xtype: 'checkbox',
                                                                                                    boxLabel: objAjax1[jj].education,
                                                                                                    name:'education'+objAjax1[jj].id_user ,
                                                                                                    checked:'true',
                                                                                                    inputValue: objAjax1[jj].id_user,
                                                                                                    width:220
                                                                                                    };ii++
                                                                                         }
                                                                                  
                                                       var box2=new Ext.form.CheckboxGroup({
                                                                                      fieldLabel: 'Образование',
                                                                                      id:'Education',
                                                                                      columns: 1,
                                                                                      margin: 5 ,
                                                                                      style:'margin-left:100px;',
                                                                                      items: sss1
                                                                                   });
                                                                            
                                                       Ext.getCmp('bigPannel1').add(box2)                        
                                                       },
                   failure: function(response, options){      }
    });
 

   Ext.getCmp('bigPannel1').add(button)   
  
});