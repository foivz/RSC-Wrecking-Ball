package rsc.foi.hr.lifeline;

import android.app.Application;

/**
 * Created by dino on 22/11/14.
 */
public class LifeLineApplication extends Application {

    private static LifeLineApplication instance;

    @Override
    public void onCreate() {
        super.onCreate();
        
        instance = this;
    }

    public LifeLineApplication getInstance() {
        return instance;
    }
}
