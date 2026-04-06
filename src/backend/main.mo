import Runtime "mo:core/Runtime";

actor {
  let siteTitle = "Regulatory Radar";
  let siteDescription = "Stay updated with the latest regulatory changes and compliance requirements. Regulatory Radar provides clear, concise summaries to help businesses and individuals navigate complex regulatory environments.";

  public query ({ caller }) func getSiteTitle() : async Text {
    siteTitle;
  };

  public query ({ caller }) func getSiteDescription() : async Text {
    siteDescription;
  };

  public shared ({ caller }) func updateSiteInfo() : async () {
    Runtime.trap("Update not allowed. Site information is static.");
  };
};
