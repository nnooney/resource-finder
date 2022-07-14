package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

/** Servlet responsible for creating new tasks. */
@WebServlet("/new-house")
public class NewHouseServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Sanitize user input to remove HTML tags and JavaScript.
    String name = Jsoup.clean(request.getParameter("name"), Safelist.none());
    String address = Jsoup.clean(request.getParameter("address"), Safelist.none());
    String school = Jsoup.clean(request.getParameter("school"), Safelist.none());
    String description = Jsoup.clean(request.getParameter("description"), Safelist.none());
    String cost = Jsoup.clean(request.getParameter("cost"), Safelist.none()); /**cost is in int or long */
    long timestamp = System.currentTimeMillis();

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("House");
    FullEntity houseEntity =
        Entity.newBuilder(keyFactory.newKey())
            .set("name", name)
            .set("address", address)
            .set("school", school)
            .set("description", description)
            .set("cost", cost)
            .set("timestamp", timestamp)
            .build();
    datastore.put(houseEntity);

    response.sendRedirect("/index.html");
  }
}