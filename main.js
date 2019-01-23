let loaded = function(){
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBvqrA1lkNP-Se9-ZM98He7FVsg3LVnco8",
    authDomain: "feu17loginlab.firebaseapp.com",
    databaseURL: "https://feu17loginlab.firebaseio.com",
    projectId: "feu17loginlab",
    storageBucket: "feu17loginlab.appspot.com",
    messagingSenderId: "987535431747"
  };
  firebase.initializeApp(config);

  const db = firebase.database();

  //** GITHUB SIGN IN SCRIPT **//
	let provider = new firebase.auth.GithubAuthProvider();
	provider.setCustomParameters({  // optional
	  'allow_signup': 'true'
	});
	//** CHECK IF USER IN SIGNED IN WITH GITHUB **//
	
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
		console.log('onAuthStateChanged: user is signed in', user);
		//githubSignInFunction();
			// ...
		} else {
			// User is signed out.
			// ...
		console.log('onAuthStateChanged: user is signed out');
		}
  });
  
  
		//** GITHUB POPUP SIGN IN SCRIPT **//
		let popupButtonGithub = document.getElementsByClassName('loginBtn--github')[0]
		popupButtonGithub.addEventListener('click', function(event){
			githubSignInFunction();
		});
		let githubSignInFunction = function(){
			firebase.auth().signInWithPopup(provider).then(function(result) {
				var user = result.user;
				console.log(user);
				console.log('Popup result: logged in as ', user.displayName);
				userIMG.src = user.photoURL;
				userIdText.innerHTML ="Logged in "+ user.displayName;
				let userInfoWrapper = document.getElementsByClassName('userInfoWrapper')[0];
				userInfoWrapper.className = "userInfoWrapperShow";
				let containerLoginButtons = document.getElementsByClassName("containerLoginButtons")[0]; //HIDES THE LOGIN BUTTONS
				containerLoginButtons.className = "hideButtons";
				let so1 = document.getElementsByClassName("so1")[0];
				so1.className = "so1Show";
				//** LOGGING OUT OTHERS IF ANY **//
				firebase.auth().signOut().then(function() {
					console.log("Sign out from Google account success")
				}).catch(function(error) {
				});
					firebase.auth().signOut().then(function() {
					  console.log("Facebook sign out was successful")
					}).catch(function(error) {
					});
			}).catch(function(error) {
				console.log('Popup result, error: ' + error.message);
			});
    }
    
    //** GITHUB SIGN OUT **//
		document.getElementById('signoutButton').addEventListener('click', function(event) {
			firebase.auth().signOut().then(function(result) {
				let userInfoWrapperShow = document.getElementsByClassName('userInfoWrapperShow')[0]; //HIDES THE USER INFO
				userInfoWrapperShow.className = "userInfoWrapper";
				let hideButtons = document.getElementsByClassName("hideButtons")[0]; //SHOWS THE LOGIN BUTTONS
				hideButtons.className = "containerLoginButtons";
				let so1Show = document.getElementsByClassName("so1Show")[0];
				so1Show.className = "so1";
				console.log('Signed out user');
			})
			.catch(function(error) {
				console.log('Signout failed');
			})
		})

} //loaded

window.addEventListener('load',loaded);