if (!window.Shortcuts) {
  var Shortcuts = new Object();
}

Object.extend(Shortcuts, {

	shortcuts:false,
	
	register_shortcut: function( key, handler ) {
		if (!this.shortcuts)
			this.shortcuts=[];
		this.shortcuts[key] = handler;
	},
	
	// Control key + shortcut.
        register_shortcut_ctrl: function( key, handler ) {
		if (!this.shortcut_ctrls)
		    this.shortcut_ctrls=[];

		this.shortcut_ctrls[key] = handler;
	},

	go:function(key) {
		handler = Shortcuts.shortcuts[character];
		if (handler) {
			handler(key);
		}
	},
	
	start: function() {
		Event.observe(document, 'keypress', function(e){
				var target;
				if (!e) var e = window.event;
				if (e.target) target = e.target;
				else if (e.srcElement) target = e.srcElement;
				if (target.nodeType == 3) // defeat Safari bug
					target = target.parentNode;
		
				// For ctrl shortcuts Ctrl + <character>
				if (e.ctrlKey){

				    if (e.keyCode) code = e.keyCode;
				    else if (e.which) code = e.which;

				    // Get the character attached to the Ctrl sequence and turn that into lowercase
				    var character = String.fromCharCode(code).toLowerCase();
		
				    // Call the handler for the ctrl
				    handler = Shortcuts.shortcut_ctrls[character];

				    if (handler) {
					Event.stop(e);
					handler(character);
				    }
				}


				if (target.tagName.toLowerCase()!='input' && target.tagName.toLowerCase()!='textarea') {
					var code;
					if (e.keyCode) code = e.keyCode;
					else if (e.which) code = e.which;
					
					// ignore modifiers that trigger accesskey links
					if (e.ctrlKey || e.altKey || e.altGraphKey || e.metaKey)
						return;
					
					var character = String.fromCharCode(code).toLowerCase();
		
					handler = Shortcuts.shortcuts[character];
					if (handler) {
						Event.stop(e);
						handler(character);
					}
				}
		 	},
		 	false
		);
	}
	
});
Shortcuts.start();
