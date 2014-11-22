package hr.foi.rsc.lifeline.mvp.presenters.impl;

import com.parse.LogInCallback;
import com.parse.ParseException;
import com.parse.ParseUser;

import hr.foi.rsc.lifeline.mvp.presenters.LoginPresenter;
import hr.foi.rsc.lifeline.mvp.views.LoginView;

/**
 * Created by dino on 22/11/14.
 */
public class LoginPresenterImpl implements LoginPresenter {

    private boolean canceled;

    private LoginView loginView;

    public LoginPresenterImpl(LoginView loginView) {
        this.loginView = loginView;
    }

    @Override
    public void authenticateUser(String username, String password) {
        canceled = false;
        loginView.showProgress();
        ParseUser.logInInBackground(username, password, logInCallback);
    }

    private LogInCallback logInCallback =  new LogInCallback() {
        @Override
        public void done(ParseUser parseUser, ParseException e) {
            if (canceled) {
                return;
            }

            loginView.hideProgress();

            if (parseUser != null) {
                loginView.navigateToHome();
            } else {
                loginView.showError(e.getMessage());
            }
        }
    };

    @Override
    public void cancel() {
        canceled = true;
    }
}
