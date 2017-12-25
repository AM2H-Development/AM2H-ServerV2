/* 
Felddefinition
V2.0.3 vom 14.04.2017
*/
/* global ds, Function, math */
var socket = io();
var mathScope={};

$(document).ready(function () {
    initFields();
});

// global Helper functions
var _h={
    convertQualifiedTopic: (topic) => {
        return topic.toString().replace(/[\/\:]/g ,"__");
    },
    extractTopic: (qualifiedTopic) => {
        return qualifiedTopic.toString().replace(/\:.*/g ,"");
    },
    convertAllQualifiedTopics: (rule)=>{
        const regex = /\{\{([^\}]*)\}\}/g;
        const str = rule;
        var mRule = str;
        let m;
        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {regex.lastIndex++;}
            mRule = mRule.replace(m[0].toString(),_h.convertQualifiedTopic(m[1]));
        }
        mRule = mRule.replace(/'/g, '"');
        return mRule;
    }
};

class CssRules {
    constructor(arr=[],initCls="df"){
        this.initCls=initCls;
        this.rules=[]; // {cls:cls,rule:"true",mRule:"true"}
        arr.forEach((e)=>{
           this.add(e.cls,e.rule); 
        });
        return this;
    }
    setInitClass(cls){
        this.initCls=cls;
        return this;
    }
    add(cls,rule){
        const regex = /\{\{([^\}]*)\}\}/g;
        const str = rule;
        var mRule = str;
        let m;
        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {regex.lastIndex++;}
            mRule = mRule.replace(m[0].toString(),_h.convertQualifiedTopic(m[1]));
        }
        this.rules.push({cls:cls,rule:rule,mRule:mRule});
        return this;
    }
    getTopics(){
        var arr=[];
        this.rules.forEach((e)=>{
            const regex = /\{\{([^\}]*)\}\}/g;
            const str = e.rule;
            let m;
            while ((m = regex.exec(str)) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                var t = _h.extractTopic(m[1]);
                // console.log(t);
                arr[t]=t;
            }
        });         
        return arr;
    }
    eval(scope){
        var cls="";
        this.rules.forEach((e)=>{
            if (math.eval(e.mRule,scope)) cls+=e.cls+" ";
        });
        return cls;
    }
}

class Container {
    constructor(context=null, bgImage="", progressBar='<div><div style="width:100%;" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div></div>'){
        this.dfContainer={};
        this.currentId=0;
        this.context = context;
        this.bgImage=bgImage;
        if (context) this.setBgImage(bgImage);
        this.progressBar =progressBar;
        this.startFlag=false;
        this.socketListeners={};
        return this;
    }
    setContext(context){
        this.context=context;
        return this;
    }
    setBgImage(bgImage){
        if (!this.context) {console.error("Please set context first [setContext(context);]"); return this;}
        this.bgImage=bgImage;
        $(this.context).css(this.bgImage);
        return this;
    }
    start(){
        this.startFlag=true;
    }
    initElement(element,qualifiedTopic,pos,cls,onClick){
        if (!this.context) {console.error("Please set context first [setContext(context);]"); return this;}
        var id=this.currentId++;

        if (cls===""){cls= new CssRules();}
        if (!(cls instanceof CssRules)) { cls= new CssRules([],cls); }
        
        this.dfContainer[id]={
            id:id,
            renderer:element,
            qualifiedTopic:qualifiedTopic,
            pos:pos,
            cls:cls,
            onClick:onClick,
            init:true,
            lastMessage:null
        };         
        return this[element](id);
    }
    inp(qualifiedTopic,pos="width: 130px; left:  10px; top: 50px;",cls="df",onClick=""){
        return this.initElement("_inp",qualifiedTopic,pos,cls,onClick);
    }
    _inp(id){
        var dfC=this.dfContainer[id];
        var value="";
        var cls="";
        
        if (dfC.init) {
            cls=dfC.cls.initCls+" ";
            if (dfC.qualifiedTopic !==""){
                this._addSocketListener(_h.extractTopic(dfC.qualifiedTopic),id);
                this._addToMathScope({message:"",formattedMessage:"",topic:_h.extractTopic(dfC.qualifiedTopic),ts:0}); // Just make sure that is initialzied
            }
            var cssTopics = dfC.cls.getTopics();
            for (var prop in cssTopics) {
                this._addToMathScope({message:"",formattedMessage:"",topic:cssTopics[prop],ts:0}); // Just make sure that is initialzied
                this._addSocketListener(cssTopics[prop],id);
            }
        } else{
            cls = dfC.cls.initCls+" "+dfC.cls.eval(mathScope);
            if (dfC.qualifiedTopic !=="") value=mathScope[_h.convertQualifiedTopic(dfC.qualifiedTopic)];
        }
       
       // <input type="text" id="uname" name="name"
       //    placeholder="Lower case, all one word">
       
        var html = '<div id="df' + dfC.id + '" class="' + cls + (dfC.init ? "wait":"")+ '"'  + ' style="' + dfC.pos + '" onclick="' + dfC.onClick + '">';
        html+='<form onSubmit="alert(\'submit\');return false;"><input type="text"'  + ' style="' + dfC.pos + ' padding:0px; border:0px;" id="in' + dfC.id + '" placeholder="';
        var htmlClose = '"><input type="submit" style="display: none" /></form>';
        var divClose = '</div>';
        
        if (dfC.init) {
            $(this.context).append(html + htmlClose + ((dfC.qualifiedTopic !=="") ? this.progressBar:"") + divClose);
            dfC.init=false;
        } else {
            $("#df"+dfC.id).replaceWith(html + value + htmlClose + divClose);
            if (dfC.lastMessage !== value) {
                var color=$("#df"+dfC.id).css("borderColor");
                $("#df"+dfC.id).css("borderColor","#ffffff");
                $("#df"+dfC.id).animate({borderColor: color}, 400 );
                dfC.lastMessage=value;
            }
        }
        return this;
    }
    box(qualifiedTopic,pos="width: 130px; left:  10px; top: 50px;",cls="df",onClick=""){
        return this.initElement("_box",qualifiedTopic,pos,cls,onClick);
    }
    _box(id){
        var dfC=this.dfContainer[id];
        var value="";
        var cls="";
        
        if (dfC.init) {
            cls=dfC.cls.initCls+" ";
            if (dfC.qualifiedTopic !==""){
                this._addSocketListener(_h.extractTopic(dfC.qualifiedTopic),id);
                this._addToMathScope({message:"",formattedMessage:"",topic:_h.extractTopic(dfC.qualifiedTopic),ts:0}); // Just make sure that is initialzied
            }
            var cssTopics = dfC.cls.getTopics();
            for (var prop in cssTopics) {
                this._addToMathScope({message:"",formattedMessage:"",topic:cssTopics[prop],ts:0}); // Just make sure that is initialzied
                this._addSocketListener(cssTopics[prop],id);
            }
        } else{
            cls = dfC.cls.initCls+" "+dfC.cls.eval(mathScope);
            if (dfC.qualifiedTopic !=="") value=mathScope[_h.convertQualifiedTopic(dfC.qualifiedTopic)];
        }
       
        var html = '<div data-topic="'+_h.extractTopic(dfC.qualifiedTopic)+'" id="df' + dfC.id + '" class="' + cls + (dfC.init ? "wait":"") + '" style="' + dfC.pos + '" onclick="' + dfC.onClick + '">';
        var htmlClose = "</div>";
        
        if (dfC.init) {
            $(this.context).append(html + ((dfC.qualifiedTopic !=="") ? this.progressBar:"") + htmlClose);
            dfC.init=false;
        } else {
            $("#df"+dfC.id).replaceWith(html + value + htmlClose);
            if (dfC.lastMessage !== value) {
                var color=$("#df"+dfC.id).css("borderColor");
                $("#df"+dfC.id).css("borderColor","#ffffff");
                $("#df"+dfC.id).animate({borderColor: color}, 400 );
                dfC.lastMessage=value;
            }
        }
        return this;
    }
    _addSocketListener(topic,id){
        if (!this.socketListeners[topic+"###"+id]){
            //console.log("Listening on:" + topic);
            socket.on(topic,(fullTopic)=>this._socketListenerHandler(fullTopic,id,this));
            socket.emit('poll',topic);
            this.socketListeners[topic+"###"+id]={};
        }
    }
    _socketListenerHandler(fullTopic,id,scope){
        this._addToMathScope(fullTopic);
        if (this.startFlag) scope[scope.dfContainer[id].renderer](id);
    }
    _addToMathScope(fullTopic){
        var __m  = _h.convertQualifiedTopic(fullTopic.topic+":message");
        var __fm = _h.convertQualifiedTopic(fullTopic.topic+":formattedMessage");
        var __ts = _h.convertQualifiedTopic(fullTopic.topic+":ts");
        mathScope[__m]=fullTopic.message;
        mathScope[__fm]=fullTopic.formattedMessage;
        mathScope[__ts]=fullTopic.ts;
    }
    /*
    send(topicmessage){ // {topic: "topic", message: "message"}
        //console.log(topicmessage);
        if (!isNaN(topicmessage.message)) topicmessage.message+="";
        //console.log(topicmessage);
        socket.emit('set',topicmessage);
    }*/
};

function emit(topic,message){
    var topicmessage={topic:topic, message:message};
    if (!isNaN(topicmessage.message)) topicmessage.message+="";
    //console.log(topicmessage);
    socket.emit('set',topicmessage);
};

function chart(id){ // {topic: "topic", duration:"timestamp-timestamp"}
    console.log(id.id);
    socket.emit('chart',{topic:"123",interval:"456"});        
};

function mathEval(eval){
    eval = _h.convertAllQualifiedTopics(eval);
    // console.log(eval + " = "); 
    var res = math.eval(eval,mathScope);
    // console.log(res);
    return res;
};