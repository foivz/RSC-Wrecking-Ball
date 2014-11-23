package hr.foi.rsc.lifeline.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import butterknife.ButterKnife;
import hr.foi.rsc.lifeline.R;
import hr.foi.rsc.lifeline.mvp.views.ProfileOverviewView;

public class ProfileOverviewFragment extends BaseFragment implements ProfileOverviewView {

    public ProfileOverviewFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile_overview, container, false);
        ButterKnife.inject(this, view);
        return view;
    }

    @Override
    public void showData(String liters, String daysToNext, String achievements,
                         String litersToFreeTicket) {

    }

    @Override
    public void showProgress() {
        showProgressBar();
    }

    @Override
    public void hideProgress() {
        hideProgressBar();
    }

    @Override
    public void showError(String message) {
        showDialog(message);
    }
}
