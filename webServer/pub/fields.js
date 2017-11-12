/* 
Felddefinition
V2.0.3 vom 14.04.2017
*/
/* global ds, Function, math */
var socket = io();

$(document).ready(function () {
    initFields();
});

// global Helper functions
var _h={
    convertQualifiedTopic: function(topic){
        return topic.toString().toLowerCase().replace(/[\/\:]/g ,"__");
    },
    extractTopic: function(qualifiedTopic){
        return qualifiedTopic.toString().toLowerCase().replace(/\:.*/g ,"");
    }    
};

class CssRules {
    constructor(arr=[]){
        this.rules=[]; // {cls:cls,rule:"true",mRule:"true"}
        arr.forEach((e)=>{
           this.add(e.cls,e.rule); 
        });
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
        this.mathScope={};
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
    box(qualifiedTopic,pos="width: 130px; left:  10px; top: 50px;",cls="",onClick=""){
        if (!this.context) {console.error("Please set context first [setContext(context);]"); return this;}
        var id=this.currentId++;

        if (cls===""){cls= new CssRules();}
        if (!(cls instanceof CssRules)) { cls= new CssRules([{cls:cls,rule:"true"}]); }
        
        this.dfContainer[id]={id:id,renderer:"_box",qualifiedTopic:qualifiedTopic,pos:pos,cls:cls,onClick:onClick,init:true};         
        return this._box(id);
    }
    _box(id){
        var dfC=this.dfContainer[id];
        var value="";
        var cls="";
        
        if (dfC.init) {
            this._addSocketListener(_h.extractTopic(dfC.qualifiedTopic),id);
            this._addToMathScope({message:"",formattedMessage:"",topic:_h.extractTopic(dfC.qualifiedTopic),ts:0},this); // Just make sure that is initialzied
            var cssTopics = dfC.cls.getTopics();
            //console.log("L for: "+id+" = ");
            //console.log(cssTopics);
            //console.log(cssTopics.length);
            for (var prop in cssTopics) {
                this._addToMathScope({message:"",formattedMessage:"",topic:cssTopics[prop],ts:0},this); // Just make sure that is initialzied
                this._addSocketListener(cssTopics[prop],id);
            }
        } else{
            cls = dfC.cls.eval(this.mathScope);
            value=this.mathScope[_h.convertQualifiedTopic(dfC.qualifiedTopic)];
        }
       
        var html = '<div id="df' + dfC.id + '" class="df ' + cls + (dfC.init ? "wait":"") + '" style="' + dfC.pos + '" onclick="' + dfC.onClick + '">';
        var htmlClose = "</div>";
        
        if (dfC.init) {
            $(this.context).append(html + this.progressBar + htmlClose);
            dfC.init=false;
        } else {
            $("#df"+dfC.id).replaceWith(html + value + htmlClose);
        }
        return this;
    }
    _addSocketListener(topic,id){
        if (!this.socketListeners[topic+"###"+id]){
            socket.on(topic,(fullTopic)=>this._socketListenerHandler(fullTopic,id,this));
            socket.emit('poll',topic);
            this.socketListeners[topic+"###"+id]={};
        }
    }
    _socketListenerHandler(fullTopic,id,scope){
        this._addToMathScope(fullTopic, scope);
        if (this.startFlag) scope[scope.dfContainer[id].renderer](id);
    }
    _addToMathScope(fullTopic, scope){
        var __m  = _h.convertQualifiedTopic(fullTopic.topic+":message");
        var __fm = _h.convertQualifiedTopic(fullTopic.topic+":formattedMessage");
        var __ts = _h.convertQualifiedTopic(fullTopic.topic+":ts");
        scope.mathScope[__m]=fullTopic.message;
        scope.mathScope[__fm]=fullTopic.formattedMessage;
        scope.mathScope[__ts]=fullTopic.ts;
    }
    send(topicmessage){
        //console.log(topicmessage);
        if (!isNaN(topicmessage.message)) topicmessage.message+="";
        //console.log(topicmessage);
        socket.emit('set',topicmessage);
    }
}
