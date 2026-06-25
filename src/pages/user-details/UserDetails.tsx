import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { useUser } from "../../hooks/useUsers";
import { ComingSoon } from "../../components/ui/coming-soon/ComingSoon";
import { formatCurrency } from "../../utils/helpers";
import s from "./UserDetails.module.scss";

export function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading, error } = useUser(id);
  const [activeTab, setActiveTab] = useState("General Details");
  const [imgError, setImgError] = useState(false);

  if (loading) {
    return (
      <div className={s.loadingState}>
        <div className={s.skeletonHeader} />
        <div className={s.skeletonTabs} />
        <div className={s.skeletonBody} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={s.errorState}>
        <p>{error || "User not found"}</p>
        <button onClick={() => navigate("/users")}>Back to Users</button>
      </div>
    );
  }

  const { profile, education, guarantor, socials } = user;

  return (
    <div className={s.container}>
      <button className={s.backBtn} onClick={() => navigate("/users")}>
        <ArrowLeft size={20} /> Back to Users
      </button>

      <div className={s.headerActions}>
        <h1 className={s.title}>User Details</h1>
        <div className={s.actionBtns}>
          <button className={s.blacklistBtn} onClick={() => alert("This feature is coming soon!")}>BLACKLIST USER</button>
          <button className={s.activateBtn} onClick={() => alert("This feature is coming soon!")}>ACTIVATE USER</button>
        </div>
      </div>

      <div className={s.profileCard}>
        <div className={s.profileHeader}>
          <div className={s.avatarWrap}>
            {profile.avatar && !imgError ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                className={s.avatar}
                onError={() => setImgError(true)}
              />
            ) : (
              <span className={s.avatarInitials}>
                {profile.firstName?.charAt(0)}{profile.lastName?.charAt(0)}
              </span>
            )}
          </div>
          <div className={s.basicInfo}>
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p>{user.accountNumber}</p>
          </div>

          <div className={s.divider} />

          <div className={s.tierInfo}>
            <p>User's Tier</p>
            <div className={s.stars}>
              <Star size={14} className={s.starFilled} fill="currentColor" />
              <Star size={14} className={s.starEmpty} />
              <Star size={14} className={s.starEmpty} />
            </div>
          </div>

          <div className={s.divider} />

          <div className={s.balanceInfo}>
            <h2>₦{formatCurrency(user.accountBalance)}</h2>
            <p>{user.accountNumber}/Providus Bank</p>
          </div>
        </div>

        <div className={s.tabs}>
          {["General Details", "Documents", "Bank Details", "Loans", "Savings", "App and System"].map((tab) => (
            <button
              key={tab}
              className={`${s.tab} ${activeTab === tab ? s.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "General Details" ? (
        <div className={s.detailsCard}>
          <section className={s.section}>
            <h3>Personal Information</h3>
            <div className={s.grid}>
              <div className={s.field}>
                <span className={s.label}>Full Name</span>
                <span className={s.value}>{profile.firstName} {profile.lastName}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Phone Number</span>
                <span className={s.value}>{profile.phoneNumber}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Email Address</span>
                <span className={s.value}>{user.email}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Bvn</span>
                <span className={s.value}>{profile.bvn}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Gender</span>
                <span className={s.value}>{profile.gender}</span>
              </div>
            </div>
          </section>

          <hr className={s.sectionDivider} />

          <section className={s.section}>
            <h3>Education and Employment</h3>
            <div className={s.grid}>
              <div className={s.field}>
                <span className={s.label}>Level of education</span>
                <span className={s.value}>{education.level}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Employment Status</span>
                <span className={s.value}>{education.employmentStatus}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Sector of employment</span>
                <span className={s.value}>{education.sector}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Duration of employment</span>
                <span className={s.value}>{education.duration}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Office email</span>
                <span className={s.value}>{education.officeEmail}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Monthly income</span>
                <span className={s.value}>
                  ₦{formatCurrency(education.monthlyIncome[0])} - ₦{formatCurrency(education.monthlyIncome[1])}
                </span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Loan repayment</span>
                <span className={s.value}>₦{formatCurrency(education.loanRepayment)}</span>
              </div>
            </div>
          </section>

          <hr className={s.sectionDivider} />

          <section className={s.section}>
            <h3>Socials</h3>
            <div className={s.grid}>
              <div className={s.field}>
                <span className={s.label}>Twitter</span>
                <span className={s.value}>{socials.twitter}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Facebook</span>
                <span className={s.value}>{socials.facebook}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Instagram</span>
                <span className={s.value}>{socials.instagram}</span>
              </div>
            </div>
          </section>

          <hr className={s.sectionDivider} />

          <section className={s.section}>
            <h3>Guarantor</h3>
            <div className={s.grid}>
              <div className={s.field}>
                <span className={s.label}>Full Name</span>
                <span className={s.value}>{guarantor.firstName} {guarantor.lastName}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Phone Number</span>
                <span className={s.value}>{guarantor.phoneNumber}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Address</span>
                <span className={s.value}>{guarantor.address}</span>
              </div>
              <div className={s.field}>
                <span className={s.label}>Gender</span>
                <span className={s.value}>{guarantor.gender}</span>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className={s.detailsCard} style={{ padding: "40px" }}>
          <ComingSoon title={activeTab} />
        </div>
      )}
    </div>
  );
}
