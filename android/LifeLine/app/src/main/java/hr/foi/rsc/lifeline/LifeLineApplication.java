package hr.foi.rsc.lifeline;

import android.app.Application;

import com.parse.Parse;

/**
 * Created by dino on 22/11/14.
 */
public class LifeLineApplication extends Application {

    private static LifeLineApplication instance;

    @Override
    public void onCreate() {
        instance = this;

        Parse.initialize(this, "Qz1N1B4aBwzmiszChrGKU37QalVXzZ8iew6hV2oH",
            "kWAfX9HmPe1HRXojqj8kuPEufx0r9yXFcoCzVdAq");

        Parse.setLogLevel(Parse.LOG_LEVEL_VERBOSE);
    }

    public LifeLineApplication getInstance() {
        return instance;
    }
}
