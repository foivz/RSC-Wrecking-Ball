package hr.foi.rsc.lifeline;

import android.app.Application;

import com.parse.Parse;
import com.parse.ParseFacebookUtils;
import com.parse.ParseTwitterUtils;

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
        ParseTwitterUtils.initialize("GtQtnF894a6USOPRIVZx2HWfv",
            "yiG7Sn6ZTlVQbKSCtylH9LRmNCGA4Ir6jdNyKXdQMSGu9oQmwx");
//        ParseFacebookUtils.initialize("830063417017234");

        Parse.setLogLevel(Parse.LOG_LEVEL_VERBOSE);
    }

    public LifeLineApplication getInstance() {
        return instance;
    }
}
