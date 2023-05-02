package umm3601.form;

import org.mongojack.Id;
import org.mongojack.ObjectId;
@SuppressWarnings({"VisibilityModifier"})

public class Form {
  @ObjectId @Id

  @SuppressWarnings({"MemberName"})

  public String _id;

  public Object formGroup;

  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Form)) {
      return false;
    }
    Form other = (Form) obj;
    return _id.equals((other._id));
  }

  @Override
  public int hashCode() {
    return _id.hashCode();
  }

}
