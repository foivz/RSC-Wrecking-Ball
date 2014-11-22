package hr.foi.rsc.lifeline.mvp.presenters;

/**
 * Created by dino on 22/11/14.
 */
public interface LoginPresenter extends BasePresenter {

    public void authenticateUser(String username, String password);
}
