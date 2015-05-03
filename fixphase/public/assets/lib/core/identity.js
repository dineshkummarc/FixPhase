define([], function(){
    var id = 0;

    //Constructor
    var Identity = function (){
        var _id = id++;
        this.getId = function(){
            return _id;
        };
    };



    return Identity;
});