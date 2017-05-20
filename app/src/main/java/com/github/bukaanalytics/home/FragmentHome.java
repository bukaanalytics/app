package com.github.bukaanalytics.home;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.text.method.ScrollingMovementMethod;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.github.bukaanalytics.R;
import com.github.bukaanalytics.common.HTTPRequestHelper;
import com.github.bukaanalytics.common.model.BukaAnalyticsSqliteOpenHelper;
import com.github.bukaanalytics.common.model.Product;
import com.github.bukaanalytics.common.model.Stat;

import java.util.ArrayList;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link FragmentHome.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link FragmentHome#newInstance} factory method to
 * create an instance of this fragment.
 */
public class FragmentHome extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private OnFragmentInteractionListener mListener;

    public FragmentHome() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment FragmentHome.
     */
    // TODO: Rename and change types and number of parameters
    public static FragmentHome newInstance(String param1, String param2) {
        FragmentHome fragment = new FragmentHome();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        final int activeUserId = 9925909; //TODO get active userId from login

        final HTTPRequestHelper HTTPHelper = new HTTPRequestHelper();
        final BukaAnalyticsSqliteOpenHelper db = BukaAnalyticsSqliteOpenHelper.getInstance(getContext());

        //Get product list from cloud database
        HTTPHelper.fetchProducts(activeUserId, getContext(), new HTTPRequestHelper.ProductsCallback() {
            @Override
            public void onCompleted(Exception e, List<Product> productsResult) {
                if((productsResult != null) && (productsResult.size() > 0)) {
                    //Insert products into local database
                    db.addProducts(productsResult);
                }

                ArrayList<String> productIds= new ArrayList<>();
                //get all productIds
                for (int i = 0; i < productsResult.size(); i++) {
                    productIds.add(productsResult.get(i).id);
                }
                final String[] productIdsArray = productIds.toArray(new String[0]);

                //Get stat list from cloud database, for all product ids
                HTTPHelper.fetchStats(productIdsArray, getContext(), new HTTPRequestHelper.StatsCallback() {
                    @Override
                    public void onCompleted(Exception e, List<Stat> statsResult) {
                        if((statsResult != null) && (statsResult.size() > 0)) {
                            //Current solution for 'Stats' table without unique column
                            db.deleteStats(productIdsArray);
                            //Insert stats into local database
                            db.addStats(statsResult);
                        }

                        //Whatever the result, always display current local data
                        displayData(activeUserId);
                    }
                });
            }
        });

        super.onActivityCreated(savedInstanceState);
    }

    void displayData(int userId) {
        final BukaAnalyticsSqliteOpenHelper db = BukaAnalyticsSqliteOpenHelper.getInstance(getContext());

        List<Product> products = db.getProducts(userId);

        //Construct the string
        StringBuffer sb = new StringBuffer();

        if(products.size() > 3) {
            List<Stat> stats0 = db.getStats(products.get(0).id);
            List<Stat> stats1 = db.getStats(products.get(1).id);
            List<Stat> stats2 = db.getStats(products.get(2).id);

            if(stats0 != null && stats0.size() > 0) {
                sb.append(products.get(0).id + "\n");
                for (Stat s : stats0) {
                    sb.append(String.format("%s %d %d %d %d %d %d \n", s.date, s.viewCount, s.totalViewCount, s.soldCount, s.totalSoldCount, s.interestCount, s.totalInterestCount));
                }
                sb.append("\n");
            }

            if(stats1 != null && stats1.size() > 0) {
                sb.append(products.get(1).id + "\n");
                for (Stat s : stats1) {
                    sb.append(String.format("%s %d %d %d %d %d %d \n", s.date, s.viewCount, s.totalViewCount, s.soldCount, s.totalSoldCount, s.interestCount, s.totalInterestCount));
                }
                sb.append("\n");
            }

            if(stats2 != null && stats2.size() > 0) {
                sb.append(products.get(2).id + "\n");
                for (Stat s : stats2) {
                    sb.append(String.format("%s %d %d %d %d %d %d \n", s.date, s.viewCount, s.totalViewCount, s.soldCount, s.totalSoldCount, s.interestCount, s.totalInterestCount));
                }
                sb.append("\n");
            }
        }

        TextView tv = (TextView) getView().findViewById(R.id.text_home);
        tv.setText(sb.toString());
        tv.setMovementMethod(new ScrollingMovementMethod());
    }

        /**
         * This interface must be implemented by activities that contain this
         * fragment to allow an interaction in this fragment to be communicated
         * to the activity and potentially other fragments contained in that
         * activity.
         * <p>
         * See the Android Training lesson <a href=
         * "http://developer.android.com/training/basics/fragments/communicating.html"
         * >Communicating with Other Fragments</a> for more information.
         */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
}
