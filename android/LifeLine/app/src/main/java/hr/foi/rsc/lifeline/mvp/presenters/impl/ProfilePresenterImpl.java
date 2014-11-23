package hr.foi.rsc.lifeline.mvp.presenters.impl;

import hr.foi.rsc.lifeline.mvp.presenters.ProfilePresenter;
import hr.foi.rsc.lifeline.mvp.views.ProfileView;

/**
 * Created by dino on 23/11/14.
 */
public class ProfilePresenterImpl implements ProfilePresenter {

    private boolean canceled;

    private ProfileView profileView;

    public ProfilePresenterImpl(ProfileView profileView) {
        this.profileView = profileView;
    }

    @Override
    public void saveData(String name, String surname, String address, String bloodType, String sex,
                         String additional, String rhType) {
        profileView.showProgress();
        // TODO
        profileView.hideProgress();
    }

    @Override
    public void saveData(String address, String additional) {
        profileView.showProgress();
        // TODO
        profileView.hideProgress();
    }


    @Override
    public void cancel() {
        canceled = true;
    }
}
