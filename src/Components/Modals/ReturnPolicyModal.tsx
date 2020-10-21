import { Modal } from "@Components/Basic";
import { ParagraphText } from "@Components/ParagraphText";
import { theme } from "@Definitions/Styled";
import React, { RefObject } from "react";
import ReactDOM from "react-dom";

export const ReturnPolicyModal: React.ForwardRefRenderFunction<
    HTMLDivElement,
    IReturnPolicyModal.IProps
> = props => {
    const { isShowing, toggle } = props;
    return !isShowing
        ? null
        : ReactDOM.createPortal(
              <Modal
                  border={theme.colors.primary}
                  borderRadius="18px"
                  width="330px"
              >
                  <ParagraphText className="text-primary font-25px text-center">
                      Return Policy
                  </ParagraphText>
                  <React.Fragment>
                      <div className="text-grey100 font-12px text-justify my-2">
                          <p>
                              Want to claim refund? No problem! We understand
                              the needs of our customers and accordingly
                              we want to provide one of the best services
                              to you and our customers throughout the globe and
                              cater your needs accordingly. We&rsquo;ll make it
                              right for you because that is what we do.
                          </p>
                          <p>
                              For the purposes of communication the mode shall
                              solely be <em>via </em>
                              email i.e.{" "}
                              <a href="mailto:support@veno.tv">
                                  support@veno.tv
                              </a>
                              . &nbsp;
                          </p>
                          <p>
                              But first, we must ensure whether or not you fall
                              within our Veno family eligibility criteria to
                              claim refund or return as the case may be.
                          </p>
                          <p>
                              <strong>
                                  The Veno Family Eligibility Criteria
                              </strong>
                          </p>
                          <ol>
                              <li>
                                  <strong>Blocked by the creator? </strong>
                              </li>
                          </ol>
                          <p>
                              Not a problem, Veno understands your needs and has
                              the perfect solutions for all your problems.
                              Before we give you your desired solution, it is
                              important for you to know that you cannot claim a
                              refund of any amount before you were blocked, for
                              obvious reasons.
                          </p>

                          <p>
                              If any amount is pending after getting blocked for
                              that creator only, it will be adjusted to your
                              Veno TV Wallet which you can re-use to subscribe
                              to a new creator or for making any purchases on
                              our website. All that would be required from your
                              end is timely information to our team within 30
                              days from the date of getting blocked so that we
                              may act promptly and resolve your issue. However,
                              if you fail to notify us through email within 30
                              days, your remaining amount (if any) may not be
                              adjusted.
                          </p>

                          <ol start={2}>
                              <li>
                                  <strong>Unsubscribing to a creator.</strong>
                              </li>
                          </ol>

                          <p>
                              Veno takes care of its users however, we strictly
                              discourage unsubscribing as the whole concept of
                              confidentiality between the creator and user is
                              jeopardized.{" "}
                              <strong>
                                  You cannot claim for a refund for
                                  unsubscribing to a user.{" "}
                              </strong>
                          </p>
                          <ol start={3}>
                              <li>
                                  <strong>Deletion of creators account.</strong>
                              </li>
                          </ol>
                          <p>
                              In the event of deletion of the creators account,
                              the users subscription will automatically end
                              after 30 days from the date of deletion and
                              won&rsquo;t be charged for the creator that
                              deleted his/her account.
                          </p>
                          <p>
                              As a creator, you will have to inform us{" "}
                              <em>via </em>
                              email on{" "}
                              <a href="mailto:support@veno.tv">
                                  support@veno.tv
                              </a>{" "}
                              within 30 days from the date of deletion regarding
                              the deletion, the reason (if any) and any pending
                              amount. Thereafter, within 30 days from the date
                              of deletion, you may have the right to collect
                              your earnings that are pending in your balance.
                              Furthermore, the creator who chooses to delete
                              their account, their account will be deleted
                              permanently in a period of 30 days and they will
                              not be entitled to any further subscriptions
                              during that period. &nbsp;Any claim made after 30
                              days may not be entertained.
                          </p>

                          <ol start={4}>
                              <li>
                                  <strong>Deletion of users account.</strong>
                              </li>
                          </ol>
                          <p>
                              In the event of deletion of the users account you
                              will not be entitled to claim any refund for your
                              subscription(s).
                          </p>
                          <ol start={5}>
                              <li>
                                  <strong>
                                      Timeframe for users &amp; creators.
                                  </strong>
                              </li>
                          </ol>
                          <p>
                              We believe in easy compliance therefore, as a
                              matter of policy we have set a standard time of 30
                              days for both the users and creators to address
                              us.
                          </p>
                      </div>
                      <div className="my-3 px-4 d-flex justify-content-center">
                          <div
                              className="cursor-pointer px-3 py-1 bg-primary text-white rounded d-flex align-items-center justify-content-center"
                              onClick={() => {
                                  toggle();
                              }}
                          >
                              Close
                          </div>
                      </div>
                  </React.Fragment>
              </Modal>,
              document.body
          );
};

/**
 * TODO: MOVE THIS TO INTERFACES
 */
declare namespace IReturnPolicyModal {
    export interface IProps {
        isShowing: boolean;
        modalRef?: RefObject<HTMLDivElement>;
        toggle: () => void;
    }
}
