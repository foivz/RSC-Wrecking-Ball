package hr.foi.rsc.lifeline.fragments;

import android.os.Bundle;
import android.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import butterknife.ButterKnife;
import hr.foi.rsc.lifeline.R;

/**
 * A simple {@link Fragment} subclass.
 */
public class ProfileOverviewFragment extends BaseFragment {

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

}
