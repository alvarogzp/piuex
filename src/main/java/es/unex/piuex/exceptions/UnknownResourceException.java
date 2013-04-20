package es.unex.piuex.exceptions;

/**
 * Simulated business-logic exception indicating a desired business entity or record cannot be found.
 */
public class UnknownResourceException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = -5392167142454058587L;

	public UnknownResourceException(String msg) {
        super(msg);
    }
}
